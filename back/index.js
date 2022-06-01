const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const figlet = require('figlet')
const app = express();
const multer = require('multer');
const path = require('path')
const fs = require('fs')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'acuaviva'
}

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, './images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + 'acuaviva' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')


app.post('/api/login', (req, res) => {
    const { username, password, rol } = req.body
    const values = [username, password, rol]
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT * FROM usuarios u, rol r WHERE u.username = ? AND u.password = ? AND u.id_rol = r.id AND u.id_rol='1'", values, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send({
                    "id": result[0].id,
                    "username": result[0].username,
                    "rol": result[0].rol,
                    "nombre": result[0].nombre,
                    "apellido": result[0].apellido,
                    "user": result[0].user,
                    "isAuth": true
                })
            } else {
                res.status(400).send('Usuario no existe')
            }
        }
    })
    connection.end()
})
app.post('/api/trabajador', (req, res) => {
    const { username, password, rol } = req.body
    const values = [username, password, rol]
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT * FROM trabajadores u, rol r WHERE u.username = ? AND u.password = ? AND u.id_rol = r.id AND u.id_rol='3'", values, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send({
                    "id": result[0].id,
                    "username": result[0].username,
                    "rol": result[0].rol,
                    "nombre": result[0].nombre,
                    "apellido": result[0].apellido,
                    "user": result[0].user,
                    "isAuth": true
                })
            } else {
                res.status(400).send('Usuario no existe')
            }
        }
    })
    connection.end()
})

app.post('/api/cliente', (req, res) => {
    const { username, password, rol, estrato } = req.body
    const values = [username, password, rol, estrato]
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT lectura_resiente-lectura_pasada Consumo, ((((lectura_resiente-lectura_pasada)*valor)-descuento)+deuda_anterior) Total,c.*, rl.*, r.*, e.*, co.*, es.*  FROM clientes c, rol rl, recibo r, estrato e, costos_fijos co, estado es WHERE c.username = ? AND c.password = ? AND c.id_rol = rl.id AND c.id_rol='2' AND c.id_estrato=e.id AND r.id_cliente = c.id AND r.id_estado = es.id", values, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send({
                    "id": result[0].id,
                    "username": result[0].username,
                    "rol": result[0].rol,
                    "nombre": result[0].nombre,
                    "apellido": result[0].apellido,
                    "documento": result[0].documento,
                    "telefono": result[0].telefono,
                    "correo": result[0].correo,
                    "estrato": result[0].estrato,
                    "descuento": result[0].descuento,
                    "costos": result[0].costos,
                    "valor": result[0].valor,
                    "deuda_anterior": result[0].deuda_anterior,
                    "lectura_resiente": result[0].lectura_resiente,
                    "lectura_pasada": result[0].lectura_pasada,
                    "Consumo": result[0].Consumo,
                    "Total": result[0].Total,
                    "estado": result[0].estado,
                    "tipo_vivienda": result[0].tipo_vivienda,
                    "isAuth": true
                })
            } else {
                res.status(400).send('Usuario no existe')
            }
        }
    })
    connection.end()
})

app.get('/api/costos', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT * FROM costos_fijos", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.get('/api/listatra', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query('SELECT t.id, nombre, apellido, edad, telefono, correo, username, password, rol FROM trabajadores t, rol r WHERE t.id_rol = r.id', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM trabajadores WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/guardar', (req, res) => {
    const { nombre, apellido, edad, telefono, correo, username, password, id_rol } = req.body
    const params = [
        [nombre, apellido, edad, telefono, correo, username, password, id_rol]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO trabajadores (nombre, apellido, edad, telefono, correo, username, password, id_rol) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario creado" })
        }
    })
    connection.end()
})

app.post('/api/editar', (req, res) => {
    const { id, nombre, apellido, edad, telefono, correo, username, password, id_rol } = req.body
    const params = [nombre, apellido, edad, telefono, correo, username, password, id_rol, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE trabajadores set nombre = ?, apellido = ?, edad = ?, telefono = ?, correo = ?, username = ?, password = ?, id_rol = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "USuario editado" })
        }
    })
    connection.end()
})

app.get('/api/listacli', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT c.*, r.rol, e.estrato FROM clientes c, rol r, estrato e WHERE c.id_rol = r.id AND c.id_estrato=e.id", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/listacli/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM clientes WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/listacli/guardar', (req, res) => {
    const { nombre, apellido, documento, predio, tipo_vivienda, telefono, correo, username, password, id_rol, id_estrato } = req.body
    const params = [
        [nombre, apellido, documento, predio, tipo_vivienda, telefono, correo, username, password, id_rol, id_estrato]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO clientes (nombre, apellido, documento, predio, tipo_vivienda, telefono, correo, username, password, id_rol, id_estrato) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario creado" })
        }
    })
    connection.end()
})

app.post('/api/listacli/editar', (req, res) => {
    const { id, nombre, apellido, documento, predio, tipo_vivienda, telefono, correo, username, password, id_rol, id_estrato } = req.body
    const params = [nombre, apellido, documento, predio, tipo_vivienda, telefono, correo, username, password, id_rol, id_estrato, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE clientes set nombre = ?, apellido = ?, documento = ?, predio = ?, tipo_vivienda = ?, telefono = ?, correo = ?, username = ?, password = ?, id_rol = ?, id_estrato = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "USuario editado" })
        }
    })
    connection.end()
})

app.get('/api/mision', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query('SELECT * FROM mision', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/mision/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM mision WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/mision/guardar', (req, res) => {
    const { mision } = req.body
    const params = [
        [mision]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO mision (mision) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Mision creado" })
        }
    })
    connection.end()
})

app.post('/api/mision/editar', (req, res) => {
    const { id, mision } = req.body
    const params = [mision, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE mision set mision = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Mision editado" })
        }
    })
    connection.end()
})

app.get('/api/vision', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query('SELECT * FROM vision', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/vision/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM vision WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/vision/guardar', (req, res) => {
    const { vision } = req.body
    const params = [
        [vision]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO vision (vision) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Mision creado" })
        }
    })
    connection.end()
})

app.post('/api/vision/editar', (req, res) => {
    const { id, vision } = req.body
    const params = [vision, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE vision set vision = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Mision editado" })
        }
    })
    connection.end()
})

app.get('/api/costos', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query('SELECT * FROM costos_fijos', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/costos/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM costos_fijos WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "costo fijo Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/costos/guardar', (req, res) => {
    const { costos, valor } = req.body
    const params = [
        [costos, valor]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO costos_fijos (costos, valor) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Costo fijo creado" })
        }
    })
    connection.end()
})

app.post('/api/costos/editar', (req, res) => {
    const { id, costos, valor } = req.body
    const params = [costos, valor, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE costos_fijos set costos = ?, valor = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Mision editado" })
        }
    })
    connection.end()
})

app.get('/api/ver', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query('SELECT * FROM recibo r, clientes c, estrato e WHERE r.id_cliente = c.id AND c.id_estrato = e.id', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/ver/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM recibo WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/ver/guardar', (req, res) => {
    const { consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente } = req.body
    const params = [
        [consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO recibo (consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario creado" })
        }
    })
    connection.end()
})

app.post('/api/ver/editar', (req, res) => {
    const { id, consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente } = req.body
    const params = [consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE recibo set consumo = ?, deuda_anterior = ?, id_cliente = ?, lectura_pasada = ?, lectura_resiente = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "USuario editado" })
        }
    })
    connection.end()
})

// deudas de los clientes

app.get('/api/deudas', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT nombre, apellido, ((lectura_resiente-lectura_pasada)*valor) deuda, deuda_anterior, ((((lectura_resiente-lectura_pasada)*valor)-descuento)+deuda_anterior) Total, es.estado FROM clientes c, recibo r, estrato e, costos_fijos co, estado es WHERE  c.id_estrato=e.id AND r.id_cliente = c.id AND r.id_estado = es.id", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/deuda/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM recibo WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/deuda/guardar', (req, res) => {
    const { consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente } = req.body
    const params = [
        [consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO recibo (consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario creado" })
        }
    })
    connection.end()
})

app.post('/api/deuda/editar', (req, res) => {
    const { id, consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente } = req.body
    const params = [consumo, deuda_anterior, id_cliente, lectura_pasada, lectura_resiente, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE recibo set consumo = ?, deuda_anterior = ?, id_cliente = ?, lectura_pasada = ?, lectura_resiente = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "USuario editado" })
        }
    })
    connection.end()
})

// deudas de los clientes en administrador para cambiar de estado

app.get('/api/cambio', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT ((((lectura_resiente-lectura_pasada)*valor)-descuento)+deuda_anterior) Saldo, c.*, es.*, r.* FROM clientes c, recibo r, estrato e, costos_fijos co, estado es WHERE c.id_estrato=e.id AND r.id_cliente = c.id AND r.id_estado = es.id", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/cambio/editar', (req, res) => {
    const { id, id_estado, } = req.body
    const params = [id_estado, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE recibo set id_estado = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "USuario editado" })
        }
    })
    connection.end()
})

// Upload Endpoint
app.post('/api/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`/front/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

//pqrs
app.get('/api/pqrs', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT p.id, pqrs, estado, respuesta, nombre FROM pqrs p, clientes c, estado e WHERE p.id_cliente = c.id AND p.id_estado = e.id", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/pqrs/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM pqrs WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/pqrs/guardar', (req, res) => {
    const { pqrs, id_cliente, id_estado } = req.body
    const params = [
        [pqrs, id_cliente, id_estado]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO pqrs (pqrs, id_cliente, id_estado) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Pqrs creado" })
        }
    })
    connection.end()
})

app.post('/api/pqrs/editar', (req, res) => {
    const { id, pqrs, id_cliente, id_estado } = req.body
    const params = [pqrs, id_cliente, id_estado, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE pqrs set pqrs = ?, id_cliente = ?, id_estado = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Pqrs editado" })
        }
    })
    connection.end()
})

app.post('/api/estado/editar', (req, res) => {
    const { id, respuesta, id_estado } = req.body
    const params = [respuesta, id_estado, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE pqrs set respuesta = ?, id_estado = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Pqrs editado" })
        }
    })
    connection.end()
})



app.post('/images/post', fileUpload, (req, res) => {

    const type = req.file.mimetype
    const name = req.file.originalname
    const data = fs.readFileSync(path.join(__dirname, './images/' + req.file.filename))
    var connection = mysql.createConnection(credentials)

    connection.query('INSERT INTO image set ?', [{ type, name, data }], (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Pqrs editado" })
        }
    })
    connection.end()

})

app.listen(4000, async() => {
    console.log(figlet.textSync('Acuaviva'))
})