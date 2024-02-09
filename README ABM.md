
# Proyecto Integrador Final

Sistema de Gestión Compras para manejar información de Proveedores, Productos y Órdenes de compra.

## Ejecutar localmente

Pasos necesarios para correr el proyecto localmente

Todas las tablas se generan automáticamente en h2

- Ejecutar el servidor de Java (*puerto 8080*)

- Correr el siguiente script de **SQL** en http://localhost:8080/h2-console una vez ejecutado el servidor

```sql
INSERT INTO countries (name)
VALUES ('Argentina');

INSERT INTO state (name, country_id)
VALUES ('Buenos Aires', 1), 
       ('Córdoba', 1),
       ('Santa Fe', 1),
       ('Mendoza', 1),
       ('Tucumán', 1),
       ('Entre Ríos', 1),
       ('Salta', 1),
       ('Chaco', 1),
       ('Corrientes', 1),
       ('Santiago del Estero', 1),
       ('San Juan', 1),
       ('Jujuy', 1),
       ('Río Negro', 1),
       ('Neuquén', 1),
       ('Formosa', 1),
       ('Chubut', 1),
       ('San Luis', 1),
       ('La Pampa', 1),
       ('Catamarca', 1),
       ('La Rioja', 1),
       ('Tierra del Fuego', 1),
       ('Ciudad Autónoma de Buenos Aires', 1),
       ('Santa Cruz', 1),
       ('Misiones', 1);

INSERT INTO city (name, state_id)
VALUES ('Buenos Aires', 1),
       ('La Plata', 1),
       ('Mar del Plata', 1),
       ('Bahía Blanca', 1);

INSERT INTO city (name, state_id)
VALUES ('Córdoba', 2),
       ('Villa Carlos Paz', 2),
       ('Río Cuarto', 2),
       ('Alta Gracia', 2);

INSERT INTO city (name, state_id)
VALUES ('Rosario', 3),
       ('Santa Fe', 3),
       ('Rosario de la Frontera', 3),
       ('Venado Tuerto', 3);

INSERT INTO city (name, state_id)
VALUES ('Mendoza', 4),
       ('San Rafael', 4),
       ('Malargüe', 4);

INSERT INTO city (name, state_id)
VALUES ('San Miguel de Tucumán', 5),
       ('Yerba Buena', 5),
       ('Tafí Viejo', 5),
       ('Concepción', 5);

INSERT INTO city (name, state_id)
VALUES ('Paraná', 6),
       ('Concordia', 6),
       ('Gualeguaychú', 6),
       ('Colón', 6);

INSERT INTO city (name, state_id)
VALUES ('Salta', 7),
       ('San Ramón de la Nueva Orán', 7),
       ('Tartagal', 7);

INSERT INTO city (name, state_id)
VALUES ('Resistencia', 8),
       ('Barranqueras', 8),
       ('Presidencia Roque Sáenz Peña', 8),
       ('Fontana', 8);

INSERT INTO city (name, state_id)
VALUES ('Corrientes', 9),
       ('Goya', 9),
       ('Mercedes', 9),
       ('Curuzú Cuatiá', 9);

INSERT INTO city (name, state_id)
VALUES ('Santiago del Estero', 10),
       ('La Banda', 10),
       ('Termas de Río Hondo', 10),
       ('Fernández', 10);

INSERT INTO city (name, state_id)
VALUES ('San Juan', 11),
       ('Rawson', 11),
       ('Rivadavia', 11),
       ('Pocito', 11);

INSERT INTO city (name, state_id)
VALUES ('San Salvador de Jujuy', 12),
       ('Palpalá', 12),
       ('San Pedro', 12);

INSERT INTO city (name, state_id)
VALUES ('Viedma', 13),
       ('San Carlos de Bariloche', 13),
       ('General Roca', 13),
       ('Cipolletti', 13);

INSERT INTO city (name, state_id)
VALUES ('Neuquén', 14),
       ('Plottier', 14),
       ('Cutral-Có', 14),
       ('Zapala', 14);

INSERT INTO city (name, state_id)
VALUES ('Formosa', 15),
       ('Clorinda', 15),
       ('Pirané', 15),
       ('Formosa', 15);

INSERT INTO city (name, state_id)
VALUES ('Comodoro Rivadavia', 16),
       ('Puerto Madryn', 16),
       ('Trelew', 16),
       ('Rawson', 16);

INSERT INTO city (name, state_id)
VALUES ('San Luis', 17),
       ('Villa Mercedes', 17),
       ('Merlo', 17),
       ('La Toma', 17);

INSERT INTO city (name, state_id)
VALUES ('Santa Rosa', 18),
       ('General Pico', 18),
       ('Toay', 18),
       ('Realicó', 18);

INSERT INTO city (name, state_id)
VALUES ('San Fernando del Valle de Catamarca', 19),
       ('Andalgalá', 19),
       ('Fiambalá', 19),
       ('Tinogasta', 19);

INSERT INTO city (name, state_id)
VALUES ('La Rioja', 20),
       ('Chilecito', 20),
       ('Aimogasta', 20),
       ('Chepes', 20);

INSERT INTO city (name, state_id)
VALUES ('Ushuaia', 21),
       ('Río Grande', 21),
       ('Tolhuin', 21),
       ('Porvenir', 21);

INSERT INTO city (name, state_id)
VALUES ('La Boca', 22),
       ('Recoleta', 22),
       ('Palermo', 22),
       ('Belgrano', 22);

INSERT INTO city (name, state_id)
VALUES ('Río Gallegos', 23),
       ('Caleta Olivia', 23),
       ('Puerto Deseado', 23),
       ('Río Turbio', 23);

INSERT INTO city (name, state_id)
VALUES ('Posadas', 24),
       ('Puerto Iguazú', 24),
       ('Eldorado', 24),
       ('Oberá', 24);

INSERT INTO countries (name)
VALUES ('Uruguay');

INSERT INTO state (name, country_id)
VALUES ('Artigas', 2),
       ('Canelones', 2),
       ('Cerro Largo', 2),
       ('Colonia', 2),
       ('Durazno', 2),
       ('Flores', 2),
       ('Florida', 2),
       ('Lavalleja', 2),
       ('Maldonado', 2),
       ('Montevideo', 2),
       ('Paysandú', 2),
       ('Río Negro', 2),
       ('Rivera', 2),
       ('Rocha', 2),
       ('Salto', 2),
       ('San José', 2),
       ('Soriano', 2),
       ('Tacuarembó', 2),
       ('Treinta y Tres', 2);

INSERT INTO city (name, state_id)
VALUES ('Artigas', 25),
       ('Bella Unión', 25),
       ('Tomás Gomensoro', 25);

INSERT INTO city (name, state_id)
VALUES ('Canelones', 26),
       ('Santa Lucía', 26),
       ('Las Piedras', 26);

INSERT INTO city (name, state_id)
VALUES ('Melo', 27),
       ('Río Branco', 27),
       ('Fraile Muerto', 27);

INSERT INTO city (name, state_id)
VALUES ('Colonia del Sacramento', 28),
       ('Nueva Helvecia', 28),
       ('Tarariras', 28);

INSERT INTO city (name, state_id)
VALUES ('Durazno', 29),
       ('Sarandí del Yí', 29),
       ('La Paloma', 29);

INSERT INTO city (name, state_id)
VALUES ('Trinidad', 30),
       ('Ismael Cortinas', 30),
       ('Tranqueras', 30);

INSERT INTO city (name, state_id)
VALUES ('Florida', 31),
       ('Sarandí Grande', 31),
       ('Fray Marcos', 31);

INSERT INTO city (name, state_id)
VALUES ('Minas', 32),
       ('José Pedro Varela', 32),
       ('Mariscala', 32);

INSERT INTO city (name, state_id)
VALUES ('Maldonado', 33),
       ('Punta del Este', 33),
       ('Piriápolis', 33);

INSERT INTO city (name, state_id)
VALUES ('Montevideo', 34),
       ('Ciudad de la Costa', 34),
       ('Las Piedras', 34);

INSERT INTO city (name, state_id)
VALUES ('Paysandú', 35),
       ('Guichón', 35),
       ('Quebracho', 35);

INSERT INTO city (name, state_id)
VALUES ('Fray Bentos', 36),
       ('Young', 36),
       ('Nuevo Berlín', 36);

INSERT INTO city (name, state_id)
VALUES ('Rivera', 37),
       ('Vichadero', 37),
       ('Minas de Corrales', 37);

INSERT INTO city (name, state_id)
VALUES ('Rocha', 38),
       ('Castillos', 38),
       ('La Paloma', 38);

INSERT INTO city (name, state_id)
VALUES ('Salto', 39),
       ('Constitución', 39),
       ('Colonia Lavalleja', 39);

INSERT INTO city (name, state_id)
VALUES ('San José de Mayo', 40),
       ('Libertad', 40),
       ('Ciudad del Plata', 40);

INSERT INTO city (name, state_id)
VALUES ('Mercedes', 41),
       ('Cardona', 41),
       ('Dolores', 41);

INSERT INTO city (name, state_id)
VALUES ('Tacuarembó', 42),
       ('Paso de los Toros', 42),
       ('San Gregorio de Polanco', 42);

INSERT INTO city (name, state_id)
VALUES ('Treinta y Tres', 43),
       ('Vergara', 43),
       ('Santa Clara de Olimar', 43);

INSERT INTO countries (name)
VALUES ('Chile');

INSERT INTO state (name, country_id)
VALUES ('Arica y Parinacota', 3),
       ('Tarapacá', 3),
       ('Antofagasta', 3),
       ('Atacama', 3),
       ('Coquimbo', 3),
       ('Valparaíso', 3),
       ('Metropolitana de Santiago', 3),
       ('Del Libertador General Bernardo O''Higgins', 3),
       ('Maule', 3),
       ('Ñuble', 3),
       ('Biobío', 3),
       ('La Araucanía', 3),
       ('Los Ríos', 3),
       ('Los Lagos', 3),
       ('Aysén del General Carlos Ibáñez del Campo', 3),
       ('Magallanes y de la Antártica Chilena', 3);

INSERT INTO city (name, state_id)
VALUES ('Arica', 44),
       ('Putre', 44);

INSERT INTO city (name, state_id)
VALUES ('Iquique', 45),
       ('Pozo Almonte', 45);

INSERT INTO city (name, state_id)
VALUES ('Antofagasta', 46),
       ('Taltal', 46);

INSERT INTO city (name, state_id)
VALUES ('Copiapó', 47),
       ('Caldera', 47);

INSERT INTO city (name, state_id)
VALUES ('La Serena', 48),
       ('Coquimbo', 48);

INSERT INTO city (name, state_id)
VALUES ('Valparaíso', 49),
       ('Viña del Mar', 49);

INSERT INTO city (name, state_id)
VALUES ('Santiago', 50),
       ('Puente Alto', 50);

INSERT INTO city (name, state_id)
VALUES ('Rancagua', 51),
       ('Machalí', 51);

INSERT INTO city (name, state_id)
VALUES ('Talca', 52),
       ('Curicó', 52);

INSERT INTO city (name, state_id)
VALUES ('Chillán', 53),
       ('Bulnes', 53);

INSERT INTO city (name, state_id)
VALUES ('Concepción', 54),
       ('Talcahuano', 54);

INSERT INTO city (name, state_id)
VALUES ('Temuco', 55),
       ('Padre Las Casas', 55);

INSERT INTO city (name, state_id)
VALUES ('Valdivia', 56),
       ('La Unión', 56);

INSERT INTO city (name, state_id)
VALUES ('Puerto Montt', 57),
       ('Osorno', 57);

INSERT INTO city (name, state_id)
VALUES ('Coyhaique', 58),
       ('Puerto Aysén', 58);

INSERT INTO city (name, state_id)
VALUES ('Punta Arenas', 59),
       ('Puerto Natales', 59);

INSERT INTO countries (name)
VALUES ('Brasil');

INSERT INTO state (name, country_id)
VALUES ('Acre', 4),
       ('Alagoas', 4),
       ('Amapá', 4),
       ('Amazonas', 4),
       ('Bahía', 4),
       ('Ceará', 4),
       ('Distrito Federal', 4),
       ('Espírito Santo', 4),
       ('Goiás', 4),
       ('Maranhão', 4),
       ('Mato Grosso', 4),
       ('Mato Grosso do Sul', 4),
       ('Minas Gerais', 4),
       ('Pará', 4),
       ('Paraíba', 4),
       ('Paraná', 4),
       ('Pernambuco', 4),
       ('Piauí', 4),
       ('Rio de Janeiro', 4),
       ('Rio Grande do Norte', 4),
       ('Rio Grande do Sul', 4),
       ('Rondônia', 4),
       ('Roraima', 4),
       ('Santa Catarina', 4),
       ('São Paulo', 4),
       ('Sergipe', 4),
       ('Tocantins', 4);

INSERT INTO city (name, state_id)
VALUES ('Rio Branco', 60),
       ('Cruzeiro do Sul', 60);

INSERT INTO city (name, state_id)
VALUES ('Maceió', 61),
       ('Arapiraca', 61);

INSERT INTO city (name, state_id)
VALUES ('Macapá', 62),
       ('Santana', 62);

INSERT INTO city (name, state_id)
VALUES ('Manaus', 63),
       ('Parintins', 63);

INSERT INTO city (name, state_id)
VALUES ('Salvador', 64),
       ('Feira de Santana', 64);

INSERT INTO city (name, state_id)
VALUES ('Fortaleza', 65),
       ('Caucaia', 65);

INSERT INTO city (name, state_id)
VALUES ('Brasília', 66);

INSERT INTO city (name, state_id)
VALUES ('Vitória', 67),
       ('Vila Velha', 67);

INSERT INTO city (name, state_id)
VALUES ('Goiânia', 68),
       ('Aparecida de Goiânia', 68);

INSERT INTO city (name, state_id)
VALUES ('São Luís', 69),
       ('Imperatriz', 69);

INSERT INTO city (name, state_id)
VALUES ('Cuiabá', 70),
       ('Várzea Grande', 70);

INSERT INTO city (name, state_id)
VALUES ('Campo Grande', 71),
       ('Dourados', 71);

INSERT INTO city (name, state_id)
VALUES ('Belo Horizonte', 72),
       ('Uberlândia', 72);

INSERT INTO city (name, state_id)
VALUES ('Belém', 73),
       ('Ananindeua', 73);

INSERT INTO city (name, state_id)
VALUES ('João Pessoa', 74),
       ('Campina Grande', 74);

INSERT INTO city (name, state_id)
VALUES ('Curitiba', 75),
       ('Londrina', 75);

INSERT INTO city (name, state_id)
VALUES ('Recife', 76),
       ('Jaboatão dos Guararapes', 76);

INSERT INTO city (name, state_id)
VALUES ('Teresina', 77),
       ('Parnaíba', 77);

INSERT INTO city (name, state_id)
VALUES ('Rio de Janeiro', 78),
       ('São Gonçalo', 78);

INSERT INTO city (name, state_id)
VALUES ('Natal', 79),
       ('Mossoró', 79);

INSERT INTO city (name, state_id)
VALUES ('Porto Alegre', 80),
       ('Caxias do Sul', 80);

INSERT INTO city (name, state_id)
VALUES ('Porto Velho', 81),
       ('Ji-Paraná', 81);

INSERT INTO city (name, state_id)
VALUES ('Boa Vista', 82),
       ('Rorainópolis', 82);

INSERT INTO city (name, state_id)
VALUES ('Florianópolis', 83),
       ('Joinville', 83);

INSERT INTO city (name, state_id)
VALUES ('São Paulo', 84),
       ('Guarulhos', 84);

INSERT INTO city (name, state_id)
VALUES ('Aracaju', 85),
       ('Nossa Senhora do Socorro', 85);

INSERT INTO city (name, state_id)
VALUES ('Palmas', 86),
       ('Araguaína', 86);
```

- Ejecutar el servidor de Angular (*puerto 4200*)

```bash
  ng start -o
```


- Insertar categorias desde el FRONT

- Insertar rubros desde el FRONT

- Insertar condiciones de IVA desde el front

- Insertar proveedores desde el FRONT

- Insertar productos desde el FRONT

- Insertar ordenes de compra desde el FRONT

#### Obtener todos los productos

```http
  GET /product
```
#### Obtener todos los productos activos
```http
  GET /product/active
```

#### Obtener producto por id
```http
  GET /product/{id}
```

#### Cargar producto
```http
  POST /product
```
#### Borrar producto
```http
  DELETE /product/{id}
```

#### modificar producto
```http
  PUT /product/{id}
```

#### Obtener todos los proveedores
```http
  GET /suppliers/
```

#### Obtener todos los proveedores activos
```http
  GET /supplier/active
```

#### Cargar proveedores
```http
  POST /supplier/
```

#### Modificar proveedor
```http
  PUT /supplier/{id}
```

#### Borrar proveedores
```http
  DELETE /supplier/{id}
```

#### Obtener ordenes
```http
  GET /order/
```

#### Obtener ordenes activas
```http
  GET /order/active
```

#### Post ordenes
```http
  POST /order
```

#### Update ordenes
```http
  PUT /order/{id}
```

#### Delete ordenes
```http
  DELETE /order/{id}
```

#### GET detalle de ordenes
```http
  PUT /order/{id}/orderProducts
```

### Obtener Todas las Direcciones

GET /address

### Obtener Dirección por ID

GET /address/{id}

### Crear una Dirección

POST /address

### Eliminar una Dirección

DELETE /address/{id}

### Obtener Estadísticas de todos los crud

GET /bridge

### Obtener categorias

GET /category

### Obtener categoria por id

GET /category/{id}

### Obtener categorias activas

GET /category/active

### Crear categoria

POST /category

### Eliminar categorias

DELETE /category/{id}

### Modificar categoria

PUT /category

### TAXES Y RUBROS TIENEN LOS MISMOS METODOS QUE CATEGORIA 

/tax /field

### Obtener datos de geolocalizacion

GET /geolocation

Este proyecto fue desarrollado por: **Cornet Gianluca**

