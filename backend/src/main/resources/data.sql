INSERT INTO prestamos (id, nombre_lector, fecha_prestamo, fecha_devolucion, estado)
VALUES (1, 'Ana Garcia', '2026-05-20', NULL, 'ACTIVO');

INSERT INTO prestamos (id, nombre_lector, fecha_prestamo, fecha_devolucion, estado)
VALUES (2, 'Luis Martin', '2026-05-10', '2026-05-17', 'DEVUELTO');

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (1, 'El Quijote', 'Miguel de Cervantes', '9788467032767', 2, 1);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (2, 'La sombra del viento', 'Carlos Ruiz Zafon', '9788408172177', 4, 1);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (3, 'Nada', 'Carmen Laforet', '9788423342478', 1, 2);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (4, 'Patria', 'Fernando Aramburu', '9788490663196', 5, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (5, 'Dune', 'Frank Herbert', '9780441172719', 6, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (6, 'Fundacion', 'Isaac Asimov', '9780553293357', 5, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (7, 'Neuromante', 'William Gibson', '9780441569595', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (8, 'El juego de Ender', 'Orson Scott Card', '9780812550702', 7, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (9, 'Solaris', 'Stanislaw Lem', '9780156027601', 3, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (10, 'Fahrenheit 451', 'Ray Bradbury', '9781451673319', 6, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (11, 'La mano izquierda de la oscuridad', 'Ursula K. Le Guin', '9780441478125', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (12, 'Hyperion', 'Dan Simmons', '9780553283686', 5, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (13, 'Snow Crash', 'Neal Stephenson', '9780553380958', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (14, 'Un mundo feliz', 'Aldous Huxley', '9780060850524', 6, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (15, '1984', 'George Orwell', '9780451524935', 8, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (16, 'Ready Player One', 'Ernest Cline', '9780307887443', 5, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (17, 'El problema de los tres cuerpos', 'Cixin Liu', '9780765382030', 5, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (18, 'La guerra de los mundos', 'H. G. Wells', '9780141441030', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (19, 'La maquina del tiempo', 'H. G. Wells', '9780141439976', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (20, 'Marte rojo', 'Kim Stanley Robinson', '9780553560732', 3, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (21, 'El marciano', 'Andy Weir', '9780553418026', 7, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (22, 'Proyecto Hail Mary', 'Andy Weir', '9780593135204', 6, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (23, 'Ubik', 'Philip K. Dick', '9780547572291', 3, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (24, 'Suenan los androides con ovejas electricas', 'Philip K. Dick', '9780345404473', 5, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (25, 'El hombre en el castillo', 'Philip K. Dick', '9780547572482', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (26, 'La carretera', 'Cormac McCarthy', '9780307387899', 3, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (27, 'Aniquilacion', 'Jeff VanderMeer', '9780374104092', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (28, 'El fin de la infancia', 'Arthur C. Clarke', '9780345347954', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (29, 'Cita con Rama', 'Arthur C. Clarke', '9780553287899', 3, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (30, 'La luna es una cruel amante', 'Robert A. Heinlein', '9780312863555', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (31, 'Tropas del espacio', 'Robert A. Heinlein', '9780441783588', 5, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (32, 'Carbono alterado', 'Richard K. Morgan', '9780345457684', 4, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (33, 'Leviatan despierta', 'James S. A. Corey', '9780316129084', 6, NULL);

INSERT INTO libros (id, titulo, autor, isbn, stock, prestamo_id)
VALUES (34, 'Justicia auxiliar', 'Ann Leckie', '9780316246620', 4, NULL);

ALTER TABLE prestamos ALTER COLUMN id RESTART WITH 3;
ALTER TABLE libros ALTER COLUMN id RESTART WITH 35;
