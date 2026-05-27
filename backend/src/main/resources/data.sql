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

ALTER TABLE prestamos ALTER COLUMN id RESTART WITH 3;
ALTER TABLE libros ALTER COLUMN id RESTART WITH 5;
