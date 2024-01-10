CREATE DATABASE abm_db

CREATE TABLE "countries"
  (
     "id"         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "name"       VARCHAR(255) NOT NULL,
     "created_at" DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at" DATETIME NULL,
  );

CREATE TABLE "states"
  (
     "id"         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "name"       VARCHAR(255) NOT NULL,
     "country_id" BIGINT NOT NULL,
     "created_at" DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at" DATETIME NULL,
     FOREIGN KEY ("country_id") REFERENCES "countries"("id")
  );

CREATE TABLE "categories"
  (
     "id"         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "created_at" DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at" DATETIME NULL,
     "name"       VARCHAR(255) NOT NULL
  );

CREATE TABLE "fields"
  (
     "id"         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "created_at" DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at" DATETIME NULL,
     "name"       VARCHAR(255) NOT NULL
  );

CREATE TABLE "addresses"
  (
     "id"          BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "street"      VARCHAR(255) NOT NULL,
     "number"      VARCHAR(255) NOT NULL,
     "postal_code" VARCHAR(255) NOT NULL,
     "state_id"    BIGINT NOT NULL,
     "created_at"  DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at"  DATETIME NULL,
     FOREIGN KEY ("state_id") REFERENCES "states"("id")
  );

CREATE TABLE "tax"
  (
     "id"   BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "name" VARCHAR(255) NOT NULL
  )

CREATE TABLE "suppliers"
  (
     "id"                BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "prov_id"           VARCHAR(255) NOT NULL UNIQUE,
     "name"              VARCHAR(255) NOT NULL,
     "field_id"          BIGINT NOT NULL,
     "phone"             VARCHAR(255) NOT NULL,
     "email"             VARCHAR(255) NOT NULL,
     "contact_last_name" VARCHAR(255) NOT NULL,
     "contact_name"      VARCHAR(255) NOT NULL,
     "website"           VARCHAR(255) NULL,
     "address_id"        BIGINT NOT NULL,
     "url_img"           VARCHAR(255) NULL,
     "cuit"              VARCHAR(255) NOT NULL UNIQUE,
     "created_at"        DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at"        DATETIME NULL,
     "tax_id"            BIGINT NOT NULL,
     FOREIGN KEY ("field_id") REFERENCES "fields"("id"),
     FOREIGN KEY ("address_id") REFERENCES "addresses"("id"),
     FOREIGN KEY ("tax_id") REFERENCES "tax"("id")
  );

ALTER TABLE suppliers
  ADD "deleted_at" DATETIME NULL;

ALTER TABLE suppliers
  ADD "is_deleted" BIT DEFAULT 0;

ALTER TABLE suppliers
  ADD "contact_role" VARCHAR(50);

ALTER TABLE suppliers
  ADD "contact_email" VARCHAR(50);

ALTER TABLE suppliers
  ADD "contact_phone" VARCHAR(50);

CREATE TABLE "orders"
  (
     "id"          BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "provider_id" BIGINT NOT NULL,
     "em_date"     DATE NOT NULL,
     "re_date"     DATE NOT NULL,
     "created_at"  DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at"  DATETIME NULL,
     "description" VARCHAR(255) NOT NULL,
     "pending"     BIT NOT NULL,
     "completed"   BIT NOT NULL,
     "canceled"    BIT NOT NULL,
     "total"       FLOAT NOT NULL,
     FOREIGN KEY ("provider_id") REFERENCES "suppliers"("id")
  );

ALTER TABLE orders
  ADD number VARCHAR(25)

CREATE TABLE "products"
  (
     "id"          BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "provider_id" BIGINT NOT NULL,
     "category_id" BIGINT NOT NULL,
     "sku"         VARCHAR(255) NOT NULL UNIQUE,
     "name"        VARCHAR(50) NOT NULL,
     "description" TEXT NOT NULL,
     "price"       FLOAT NOT NULL,
     "created_at"  DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at"  DATETIME NULL,
     "url_img"     VARCHAR(255) NULL,
     FOREIGN KEY ("provider_id") REFERENCES "suppliers"("id"),
     FOREIGN KEY ("category_id") REFERENCES "categories"("id")
  );

CREATE TABLE "details_orders"
  (
     "id"         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     "order_id"   BIGINT NOT NULL,
     "product_id" BIGINT NOT NULL,
     "amount"     INT NOT NULL,
     "created_at" DATETIME NOT NULL DEFAULT Getdate(),
     "updated_at" DATETIME NULL,
     FOREIGN KEY ("order_id") REFERENCES "orders"("id"),
     FOREIGN KEY ("product_id") REFERENCES "products"("id")
  ); 

INSERT INTO Countries (name) 
VALUES ('Argentina'),
	   ('Uruguay');

INSERT INTO States (name, country_id)
VALUES ('Montevideo', 2),
       ('Canelones', 2),
       ('Maldonado', 2),
       ('Rocha', 2),
       ('Colonia', 2),
       ('Flores', 2),
       ('Cerro Largo', 2),
       ('Treinta y Tres', 2);

INSERT INTO States (name, country_id)
VALUES ('Buenos Aires', 1),
       ('Córdoba', 1),
       ('Santa Fe', 1),
       ('Mendoza', 1),
       ('Entre Rios', 1),
       ('San Juan', 1),
       ('Tucuman', 1),
       ('Salta', 1),
       ('Corrientes', 1),
       ('Misiones', 1);

INSERT INTO Tax ("name") VALUES
('IVA Responsable Inscripto'),
('IVA Responsable no Inscripto'),
('IVA no Responsable'),
('IVA Sujeto Exento'),
('Consumidor Final'),
('Responsable Monotributo'),
('Sujeto no Categorizado'),
('Proveedor del Exterior'),
('Cliente del Exterior'),
('IVA Liberado – Ley Nº 19.640'),
('IVA Responsable Inscripto – Agente de Percepcion'),
('Pequeño Contribuyente Eventual'),
('Monotributista Social'),
('Pequeño Contribuyente Eventual Social');

INSERT INTO Categories ("name")
VALUES 
  ('Materiales de Construcción'),
  ('Herramientas de Construcción'),
  ('Equipamiento de Obra'),
  ('Maquinaria Pesada'),
  ('Servicios de Construcción');
  
INSERT INTO Fields ("name")
VALUES 
  ('Arquitectura'),
  ('Ingeniería Civil'),
  ('Diseño Estructural'),
  ('Urbanismo'),
  ('Gestión de Proyectos');
  
INSERT INTO Addresses ("street", "number", "postal_code", "state_id")
VALUES 
  ('Avenida Principal', '123', '1000', 1),
  ('Calle Mayor', '456', '2000', 2),
  ('Ruta 101', '789', '3000', 3),
  ('Camino del Este', '321', '4000', 4),
  ('Avenida del Puerto', '654', '5000', 5),
  ('Paso de la Cuchilla', '234', '6000', 6),
  ('Avenida los Cisnes', 'S/N', '7000', 7),
  ('General Picocheli', '5242', '8000', 8),
  ('Doctor Liotta', '423', '9000', 9),
  ('Nascar Aloe', '512', '10000', 10),
  ('Juando Peron', '1636', '11000', 11),
  ('Avenida Primaria', '1351', '12000', 12),
  ('Calle Menor', '215', '13000', 13),
  ('Calle del Medio', '1251', '14000', 14),
  ('Licenciado Pedro', '1515', '15000', 15),
  ('Easter Egg Generico', '12451', '16000', 16),
  ('Luis A. Spinetta', '1515', '17000', 17),
  ('Evita Perón', '1612', '18000', 18),
  
  ('Avenida Lejana', '61361', '1000', 1),
  ('Calle Dos', '23', '2000', 2),
  ('Ruta 999', '723', '3000', 3),
  ('Camino del Sur', '8654', '4000', 4),
  ('Avenida del Campo', '742', '5000', 5),
  ('Paso del Tenedor', '133', '6000', 6),
  ('Avenida los Perros', '111', '7000', 7),
  ('General Palasso', 'S/N', '8000', 8),
  ('Doctor Canelo', '151', '9000', 9),
  ('Nascar Vera', '23', '10000', 10),
  ('Doctor Humberto Illia', '1551', '11000', 11),
  ('Avenida Terciaria', '7942', '12000', 12),
  ('Calle Pública 2', '2525', '13000', 13),
  ('Calle nuevo Medio', '1324', '14000', 14),
  ('Licenciado Pablo', '343', '15000', 15),
  ('Easter Egg No Tan Generico', '610', '16000', 16),
  ('Charly Garcia', '8433', '17000', 17),
  ('Luis Camaño', '141', '18000', 18);
  
INSERT INTO Suppliers ("prov_id", "name", "field_id", "phone", "email", "contact_last_name", "contact_name", "address_id", "cuit", "tax_id", "contact_email", "contact_phone", "contact_role")
VALUES 
  ('SUP001', 'Proveedor Uno', 1, '123-456-7890', 'proveedor1@example.com', 'ApellidoUno', 'Pedro', 1, '426724645', 2, 'contacto_1@example.com', '+543534220345', 'Encargado'),
  ('SUP002', 'Proveedor Dos', 2, '987-654-3210', 'proveedor2@example.com', 'ApellidoDos', 'Marta', 2, '8565324233', 2, 'contacto_2@example.com', '+543534220235', 'Marketing'),
  ('SUP003', 'Proveedor Tres', 3, '111-222-3333', 'proveedor3@example.com', 'ApellidoTres', 'Juan', 3, '23235235', 3, 'contacto_3@example.com', '+543534630345', 'Dueño'),
  ('SUP004', 'Proveedor Cuatro', 1, '444-555-6666', 'proveedor4@example.com', 'ApellidoCuatro', 'Pablo', 4, '3436345', 4, 'contacto_4@example.com', '+543454220345', 'Empleado'),
  ('SUP005', 'Proveedor Cinco', 2, '777-888-9999', 'proveedor5@example.com', 'ApellidoCinco', 'Gian', 5, '246246235', 5, 'contacto_5@example.com', '+543434220345', 'Gerente'),
  ('SUP006', 'Proveedor Seis', 4, '123-456-7890', 'proveedor6@example.com', 'ApellidoSies', 'Ramiro', 1, '2462462', 6, 'contacto_6@example.com', '+543234220345', 'Desarrollador'),
  ('SUP007', 'Proveedor Siete', 5, '987-654-3210', 'proveedor7@example.com', 'ApellidoSiete', 'Javier', 2, '44564635', 7, 'contacto_7@example.com', '+5411534220345', 'QA'),
  ('SUP008', 'Proveedor Ocho', 4, '111-222-3333', 'proveedor8@example.com', 'ApellidoOcho', 'Mauricio', 3, '247246324',2, 'contacto_8@example.com', '+541134220345', 'RRHH'),
  ('SUP009', 'Proveedor Nueve', 3, '444-555-6666', 'proveedor9@example.com', 'ApellidoNueve', 'Carlos', 4, '2464574563', 1, 'contacto_9@example.com', '+543436220345', 'Operario'),
  ('SUP010', 'Proveedor Diez', 2, '777-888-9999', 'proveedor10@example.com', 'ApellidoDiez', 'Maria', 5, '346346346', 4, 'contacto_10@example.com', '+54359224345', 'Electricista');

UPDATE Suppliers
SET is_Deleted = 1
WHERE id=10 or id=4;

INSERT INTO Products ("provider_id", "category_id", "name", "description", "price", "sku")
VALUES 
  (1, 1, 'Producto Uno', 'Descripción del Producto Uno', 50.00, '1231512512'),
  (2, 2, 'Producto Dos', 'Descripción del Producto Dos', 75.00, '234112'),
  (3, 3, 'Producto Tres', 'Descripción del Producto Tres', 30.00, '12213'),
  (4, 4, 'Producto Cuatro', 'Descripción del Producto Cuatro', 120.00, 'a243e512512'),
  (5, 5, 'Producto Cinco', 'Descripción del Producto Cinco', 90.00, '1231532s12'),
  
  (1, 1, 'Servicio Uno', 'Descripción del Servicio Uno', 50.00, '12312333'),
  (2, 2, 'Servicio Dos', 'Descripción del Servicio Dos', 75.00, '123151251414'),
  (3, 3, 'Servicio Tres', 'Descripción del Servicio Tres', 30.00, '642355334'),
  (4, 4, 'Servicio Cuatro', 'Descripción del Servicio Cuatro', 120.00, '263226236'),
  (5, 5, 'Servicio Cinco', 'Descripción del Servicio Cinco', 90.00, '46235235424'),
  
  (6, 1, 'Producto 1241', 'Descripción del Producto 1241', 50.00, '2663475345345'),
  (7, 2, 'Producto 242', 'Descripción del Producto 242', 75.00, '415153252'),
  (8, 3, 'Producto 515', 'Descripción del Producto 515', 30.00, '8956876574'),
  (9, 4, 'Producto 2632', 'Descripción del Producto 2632', 120.00, '849849856'),
  (10, 5, 'Producto 15125', 'Descripción del Producto 15125', 90.00, '1231512235634'),
  
  (6, 1, 'Servicio Unico', 'Descripción del Servicio Unico', 50.00, '1412498194'),
  (7, 2, 'Servicio Para Todos', 'Descripción del Servicio Para Todos', 75.00, '254526535'),
  (8, 3, 'Servicio Para Uno solo', 'Descripción del Servicio Uno solo', 30.00, '235526356'),
  (9, 4, 'Servicio Para Maximo Dos', 'Descripción del Servicio Maximo Dos', 120.00, '12312364524'),
  (10, 5, 'Servicio De Venta', 'Descripción del Servicio Venta', 90.00, '35154145');


INSERT INTO Orders ("number", "provider_id", "em_date", "re_date", "description", "pending", "completed", "canceled", "total")
VALUES 
  ('0001', 1, '2023-01-01', '2023-01-05', 'Orden 1 - Proveedor 1', 1, 0, 0, 100.00),
  ('0002', 1, '2023-02-01', '2023-02-10', 'Orden 2 - Proveedor 1', 0, 1, 0, 150.00),
  ('0003',  1, '2023-03-01', '2023-03-15', 'Orden 3 - Proveedor 1', 0, 0, 1, 200.00),
  
  ('0004', 2, '2023-01-05', '2023-01-10', 'Orden 1 - Proveedor 2', 1, 0, 0, 120.00),
  ('0005', 2, '2023-02-10', '2023-02-20', 'Orden 2 - Proveedor 2', 0, 1, 0, 180.00),
  ('0006', 2, '2023-03-15', '2023-03-25', 'Orden 3 - Proveedor 2', 0, 0, 1, 220.00),
  
  ('0007', 3, '2023-04-05', '2023-01-10', 'Orden 1 - Proveedor 3', 1, 0, 0, 120.00),
  ('0008', 3, '2023-05-10', '2023-02-20', 'Orden 2 - Proveedor 3', 0, 1, 0, 180.00),
  ('0009', 3, '2023-06-15', '2023-03-25', 'Orden 3 - Proveedor 3', 0, 0, 1, 220.00),
  
  ('0010', 4, '2023-04-05', '2023-01-10', 'Orden 1 - Proveedor 4', 1, 0, 0, 120.00),
  ('0011', 4, '2023-05-10', '2023-02-20', 'Orden 2 - Proveedor 4', 0, 1, 0, 180.00),
  ('0012', 4, '2023-06-15', '2023-03-25', 'Orden 3 - Proveedor 4', 0, 0, 1, 220.00),
  
  ('0013', 5, '2023-04-05', '2023-01-10', 'Orden 1 - Proveedor 5', 1, 0, 0, 120.00),
  ('0014', 5, '2023-03-10', '2023-02-20', 'Orden 2 - Proveedor 5', 0, 1, 0, 180.00),
  ('0015', 5, '2023-02-15', '2023-03-25', 'Orden 3 - Proveedor 5', 0, 0, 1, 220.00),
  
  ('0016', 6, '2023-07-05', '2023-01-10', 'Orden 1 - Proveedor 6', 1, 0, 0, 120.00),
  ('0017', 6, '2023-08-10', '2023-02-20', 'Orden 2 - Proveedor 6', 0, 1, 0, 180.00),
  ('0018', 6, '2023-09-15', '2023-03-25', 'Orden 3 - Proveedor 6', 0, 0, 1, 220.00),
  
  ('0019', 7, '2023-07-05', '2023-01-10', 'Orden 1 - Proveedor 7', 1, 0, 0, 120.00),
  ('0020', 7, '2023-08-10', '2023-02-20', 'Orden 2 - Proveedor 7', 0, 1, 0, 180.00),
  ('0021', 7, '2023-09-15', '2023-03-25', 'Orden 3 - Proveedor 7', 0, 0, 1, 220.00),
  
  ('0022', 8, '2023-07-05', '2023-01-10', 'Orden 1 - Proveedor 8', 1, 0, 0, 120.00),
  ('0023', 8, '2023-08-10', '2023-02-20', 'Orden 2 - Proveedor 8', 0, 1, 0, 180.00),
  ('0024', 8, '2023-09-15', '2023-03-25', 'Orden 3 - Proveedor 8', 0, 0, 1, 220.00),
  
  ('0025', 9, '2023-07-05', '2023-01-10', 'Orden 1 - Proveedor 9', 1, 0, 0, 120.00),
  ('0026', 9, '2023-08-10', '2023-02-20', 'Orden 2 - Proveedor 9', 0, 1, 0, 180.00),
  ('0027', 9, '2023-09-15', '2023-03-25', 'Orden 3 - Proveedor 9', 0, 0, 1, 220.00),
  
  ('0028', 10, '2023-01-03', '2023-01-07', 'Orden 1 - Proveedor 10', 1, 0, 0, 90.00),
  ('0029', 10, '2023-02-08', '2023-02-15', 'Orden 2 - Proveedor 10', 1, 0, 0, 130.00),
  ('0030', 10, '2023-03-20', '2023-03-30', 'Orden 3 - Proveedor 10', 1, 0, 0, 180.00);
  
INSERT INTO Details_orders ("order_id", "product_id", "amount")
VALUES 
  (1, 1, 2),
  (1, 2, 1),
  (1, 3, 3),
  
  (2, 4, 2),
  (2, 5, 1),
  (2, 6, 3),
  
  (3, 1, 2),
  (3, 2, 1),
  (3, 3, 3),
  
  (4, 7, 2),
  (4, 8, 1),
  (4, 9, 3),
  
  (5, 10, 2),
  (5, 12, 1),
  (5, 13, 3),
  
  (6, 11, 2),
  (6, 15, 1),
  (6, 12, 3),
  
  (7, 16, 2),
  (7, 16, 1),
  (7, 19, 3),
  
  (8, 2, 2),
  (8, 20, 1),
  (8, 5, 3),
  
  (9, 19, 2),
  (9, 2, 1),
  (9, 4, 3),
  
  (10, 5, 2),
  (10, 1, 1),
  (10, 6, 3),
  
  (11, 4, 2),
  (11, 7, 1),
  (11, 7, 3),
  
  (12, 15, 2),
  (12, 2, 1),
  (12, 1, 3),
  
  (13, 5, 2),
  (13, 3, 1),
  (13, 9, 3),
  
  (14, 1, 2),
  (14, 2, 1),
  (14, 3, 3),
  
  (15, 1, 2),
  (15, 2, 1),
  (15, 3, 3),
  
  (16, 10, 2),
  (16, 11, 1),
  (16, 17, 3),
  
  (17, 15, 2),
  (17, 2, 1),
  (17, 20, 3),
  
  (18, 1, 2),
  (18, 1, 1),
  (18, 1, 3),
  
  (20, 1, 2),
  (20, 2, 1),
  (20, 3, 3),
  
  (21, 1, 2),
  (21, 2, 1),
  (21, 3, 3),
  
  (22, 1, 2),
  (22, 2, 1),
  (22, 3, 3),
  
  (23, 1, 2),
  (23, 2, 1),
  (23, 3, 3),
  
  (24, 1, 2),
  (24, 2, 1),
  (24, 3, 3),
  
  (25, 1, 2),
  (25, 2, 1),
  (25, 3, 3),
  
  (26, 1, 2),
  (26, 2, 1),
  (26, 3, 3),
  
  (27, 1, 2),
  (27, 4, 1),
  (27, 3, 3),
  
  (28, 1, 2),
  (28, 2, 1),
  (28, 3, 3),
  
  (29, 1, 2),
  (29, 2, 1),
  (29, 3, 3),
  
  (30, 18, 2),
  (30, 19, 1),
  (30, 20, 3);