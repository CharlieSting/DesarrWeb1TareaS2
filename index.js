var mysql = require('mysql');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/json' });
    var q = url.parse(req.url, true);
    var datos = q.query;

    var accion = datos.accion;

    let con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "might361#$1Ty2Q",
        database: "bibliotecaDesWeb1"
    });

    let sql = "";
    let parametros = [];

    let tabla = datos.tabla;

    if (tabla = "Libro") {
        switch (accion) {
            case "insert":
                sql = "insert into tbl_libro " +
                    "(nombre, genero, fecha_lanzamiento, autor) " +
                    "values " +
                    "(?, ?, ?, ?)";
                parametros = [datos.nombre, datos.genero, datos.fecha_lanzamiento, datos.autor];
                break;
            case "select":
                sql = "select * from tbl_libro";
                break;
            case "update":
                sql = " update tbl_libro " +
                    " set  nombre = ? ,  " +
                    " genero = ? , " +
                    " fecha_lanzamiento = ? " +
                    " autor = ? " +
                    " where id = ? ";
                parametros = [datos.nombre, datos.genero, datos.fecha_lanzamiento, datos.autor, datos.id];
                break;

            case "delete":
                sql = "delete from tbl_libro where id = ?"
                parametros = [datos.id];

                break;
            default:
                sql = "";
                break;
        }
    }

    if (tabla == "Alumno") {
        switch (accion) {
            case "insert":
                sql = "insert into tbl_alumnos " +
                    "(numero_cuenta, nombre, apellido) " +
                    "values " +
                    "(?, ?, ?)";
                parametros = [datos.numero_cuenta, datos.nombre, datos.apellido];
                break;
            case "select":
                sql = "select * from tbl_alumnos";
                break;
            case "update":
                sql = " update tbl_alumnos " +
                    " set  numero_cuenta = ? ,  " +
                    " nombre = ? , " +
                    " apellido = ? " +
                    " where numero_cuenta = ? ";
                parametros = [datos.numero_cuenta, datos.nombre, datos.apellido, datos.numero_cuenta];
                break;

            case "delete":
                sql = "delete from tbl_alumnos where numero_cuenta = ?"
                parametros = [datos.numero_cuenta];
                break;

            default:
                sql = "";
                break;

        }

    }

    if (tabla == "Prestamo") {
        switch(accion){
            case "insert":
                sql = "insert into tbl_prestamo " +
                "(id_libro, numero_cuenta, fehca_prestamo) " +
                "values " +
                "(?, ?, ?)";
                parametros = [datos.id_libro, datos.numero_cuenta, datos.fehca_prestamo];
                break;
            case "select":
                sql = "select * from tbl_prestamo";
                break;
            case "update":
                sql = " update tbl_prestamo " +
                " set  id_libro = ? ,  " +
                " numero_cuenta = ? , " +
                " fehca_prestamo = ? " +
                " where prestamo = ? ";
                parametros = [datos.id_libro, datos.numero_cuenta, datos.fehca_prestamo, datos.id_prestamo];
                break;

            case "delete":
                sql = "delete from tbl_prestamo where id_prestamo = ?"
                parametros = [datos.id_prestamo];
                break;
                
        }
    }

    if (sql != "") {

        con.connect(function (err) {

            if (err) {
                console.log(err);
            } else {

                con.query(sql, parametros, function (err, result) {

                    if (err) {
                        console.log(err);

                    } else {
                        res.write(JSON.stringify(result));
                        res.end();
                    }

                });

            }

        });

    } else {

        let retorno = { mensaje: "Metodo no encontrado" };

        res.write(JSON.stringify(retorno));
        res.end();

    }
}).listen(3000);