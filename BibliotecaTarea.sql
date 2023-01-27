create database bibliotecaDesWeb1;

create table tbl_libro
(
    id int auto_increment primary key ,
    nombre varchar(200),
    genero varchar(200),
    fecha_lanzamiento date,
    autor varchar(200)
);


create table tbl_alumnos
(
    numero_cuenta int primary key,
    nombre varchar(200),
    apellido varchar(200)
   
);

create table tbl_prestamo
(
id_prestamo int auto_increment primary key,
id_libro int,
constraint foreign key fk_id_libro (id_libro) references tbl_libro(id),
numero_cuenta int,
constraint foreign key fk_numero_cuenta(numero_cuenta) references tbl_alumnos(numero_cuenta),
fehca_prestamo date

);

select * from tbl_prestamo;
-- Bulk Insert
insert into tbl_persona ( nombre_persona, apellido_persona, fecha_nacimiento)
values
    ('Cristiano', 'Ronaldo', '1985-02-05'),
    ('Leonel', 'Messi', '1988-08-30'),
    ('Alex', 'Morgan', '1990-12-15');

insert into tbl_libro(nombre, genero, fecha_lanzamiento, autor)
values
('1984', 'Ciencia Ficcion', '1949-06-15', 'George Orwell'),
('Arte de la guerra', 'Accion y estrategia', '1772-06-17', 'Sun Tzu');

select * from tbl_libro;

insert into tbl_alumnos(numero_cuenta, nombre, apellido)
values
('32121046', 'Carlos', 'Martinez'),
('471', 'Vladimir', 'Putin');

select * from tbl_alumnos;

