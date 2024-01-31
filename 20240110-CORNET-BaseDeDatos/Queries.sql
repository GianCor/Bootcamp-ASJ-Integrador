--Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.
SELECT p.NAME    AS nombre_producto,
       c.NAME    AS categoria,
       s.NAME    AS nombre_proveedor,
       s.prov_id AS codigo_proveedor,
       p.price   AS precio
FROM   products p,
       suppliers s,
       categories c
WHERE  p.provider_id = s.id
       AND c.id = p.category_id
ORDER  BY codigo_proveedor

--En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".
UPDATE products
SET    url_img = 'urldelaimagen'
WHERE  id IN ( 2, 5 );

SELECT p.NAME    AS nombre_producto,
       c.NAME    AS categoria,
       s.NAME    AS nombre_proveedor,
       s.prov_id AS codigo_proveedor,
       p.price   AS precio,
       CASE
         WHEN p.url_img IS NULL THEN '-'
         ELSE p.url_img
       END       AS url_de_la_imagen
FROM   products p,
       suppliers s,
       categories c
WHERE  p.provider_id = s.id
       AND c.id = p.category_id;

--Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.
SELECT p.NAME        AS nombre_producto,
       p.price       AS precio,
       p.category_id AS categoria,
       p.description AS descripcion
FROM   products p
WHERE  id = 2;

--Listar todo los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.
--Se inserta SUP011 y se relaciona a una direccion que todavía no fue usada para comprobar que funcione la query
INSERT INTO suppliers
            ("prov_id",
             "name",
             "field_id",
             "phone",
             "email",
             "contact_last_name",
             "contact_name",
             "address_id",
             "cuit",
             "tax_id",
             "contact_email",
             "contact_phone",
             "contact_role")
VALUES      ('SUP011',
             'Proveedor Diez',
             2,
             '777-888-9999',
             'proveedor10@example.com',
             'ApellidoDiez',
             'Maria',
             10,
             '3463423246',
             4,
             'contacto_10@example.com',
             '+54359224345',
             'Electricista');

SELECT s.prov_id AS codigo_proveedor,
       s.NAME    AS razon_social,
       s.phone   AS telefono,
       st.NAME   AS provincia
FROM   suppliers s,
       states st,
       addresses a
WHERE  s.address_id = a.id
       AND a.state_id = st.id
       AND ( s.phone LIKE '351%'
              OR s.address_id IN (SELECT TOP 3 a.id
                                  FROM   suppliers s,
                                         addresses a,
                                         states st
                                  WHERE  s.address_id = a.id
                                         AND a.state_id = st.id
                                  GROUP  BY a.id
                                  ORDER  BY Count(s.id) DESC));

--Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social,
--codigo proveedor y fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.
SELECT s.prov_id           AS codigo_proveedor,
       s.NAME              AS razon_social,
       f.NAME              AS rubro,
       s.email,
       s.phone             AS telefono,
       s.cuit,
       t.NAME              AS condicion_iva,
       s.contact_last_name AS apellido_contacto,
       s.contact_name      AS nombre_contacto,
       s.contact_phone     AS telefono_contacto,
       s.contact_email     AS email_contacto,
       s.contact_role      AS rol_contacto,
       a.street            AS calle,
       a.number            AS numero,
       a.postal_code       AS cp,
       st.NAME             AS provincia,
       c.NAME              AS pais
FROM   suppliers s,
       fields f,
       addresses a,
       states st,
       countries c,
       tax t
WHERE  s.field_id = f.id
       AND s.address_id = a.id
       AND a.state_id = st.id
       AND st.country_id = c.id
       AND t.id = s.tax_id
       AND s.is_deleted = 0
ORDER  BY s.NAME,
          s.prov_id,
          s.created_at ASC

--Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.
--Se inserta una orden mas debido a que todos los proveedores tienen la misma cantidad de ordenes
INSERT INTO orders
            ("number",
             "provider_id",
             "em_date",
             "re_date",
             "description",
             "pending",
             "completed",
             "canceled",
             "total")
VALUES      ('0023',
             10,
             '2023-01-01',
             '2023-01-05',
             'Orden 1 - Proveedor 1',
             1,
             0,
             0,
             100.00);

SELECT s.NAME              AS nombre,
       s.prov_id           AS codigo_proveedor,
       s.url_img           AS imagen_url,
       s.website           AS sitio_web,
       s.email,
       s.phone             AS telefono,
       s.contact_name      AS nombre_contacto,
       s.contact_last_name AS apellido_contacto,
       s.contact_email     AS email_contacto,
       s.contact_phone     AS telefono_contacto,
       s.contact_role      AS rol_contacto
FROM   suppliers s
WHERE  s.id = (SELECT TOP 1 s.id
               FROM   orders o,
                      suppliers s
               WHERE  o.provider_id = s.id
               GROUP  BY s.id
               ORDER  BY Count(o.id) DESC);

--Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.
--se insertan 5 productos en el detalle de la orden 2 para comprobar su funcionamiento
INSERT INTO details_orders
            (product_id,
             order_id,
             amount)
VALUES      (2,
             2,
             2),
            (5,
             2,
             3)

SELECT o.em_date      AS fecha_emision,
       o.number       AS numero_orden,
       s.NAME         AS razon_social,
       s.prov_id      AS codigo_proveedor,
       Sum(do.amount) AS cantidad_de_productos
FROM   orders o,
       suppliers s,
       details_orders DO
WHERE  o.provider_id = s.id
       AND do.order_id = o.id
GROUP  BY o.em_date,
          o.number,
          s.NAME,
          s.prov_id
ORDER  BY cantidad_de_productos DESC

--En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.
SELECT o.em_date      AS fecha_emision,
       o.number       AS numero_orden,
       s.NAME         AS razon_social,
       s.prov_id      AS codigo_proveedor,
       Sum(do.amount) AS cantidad_de_productos,
       CASE
         WHEN o.canceled = 1 THEN 'Cancelada'
         WHEN o.pending = 1 THEN 'Pendiente'
         ELSE 'Completada'
       END            AS estado,
       o.total
FROM   orders o,
       suppliers s,
       details_orders DO
WHERE  o.provider_id = s.id
       AND do.order_id = o.id
GROUP  BY o.em_date,
          o.number,
          s.NAME,
          s.prov_id,
          CASE
            WHEN o.canceled = 1 THEN 'Cancelada'
            WHEN o.pending = 1 THEN 'Pendiente'
            ELSE 'Completada'
          END,
          o.total
ORDER  BY cantidad_de_productos DESC

--Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.
SELECT p.sku,
       p.NAME              AS nombre,
       do.amount           AS cantidad,
       do.amount * p.price AS subtotal
FROM   details_orders DO,
       orders o,
       products p
WHERE  do.order_id = o.id
       AND p.id = do.product_id
       AND o.provider_id = 3
       AND o.id = 7

--Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.
UPDATE orders
SET    canceled = 1,
       pending = 0,
       completed = 0,
       updated_at = Getdate()
WHERE  id = 4
--Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA)
/* lo comento por las dudas
DELETE FROM Details_orders WHERE product_id = 1;
DELETE FROM Products WHERE id = 1;
*/