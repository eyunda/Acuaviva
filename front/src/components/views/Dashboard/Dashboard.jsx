import React from "react"
import './Inicio.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'

export default function Dashboard() {
    const useStyles = makeStyles(theme => ({
    
        button: {
            margin: theme.spacing(1, 0, 1)
        }
    }))
    const classes = useStyles()
    const { push } = useHistory()

    const onUsuarios = () => {
                push('/app/listatra')
    }
    const onMision = () => {
                push('/app/mision')
    }
    const onVision = () => {
                push('/app/vision')
    }
    const onCostos = () => {
                push('/app/costos')
    }
    const onClientes = () => {
        push('/app/listacli')
    }
    const onPqrs = () => {
        push('/app/pqrs')
    }

    const onDeuda = () => {
        push('/app/deudas')
    }

    return (
        <>
            <h1 className="titulo">Administrador</h1>
            <div class="row row-cols-2 row-cols-md-4 g-4">
                <div class="col">
                    <div class="card h-110">
                    <img src="img/trabajadores.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Trabajadores</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onUsuarios}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="img/clientes.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Clientes</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onClientes}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="img/mision.jpg" class="card-img-top" alt="..." width="20px" height="150px" />
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Mision</h5>
                        
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onMision}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="img/vision.jpg" class="card-img-top" alt="..."  width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title">Vision</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onVision}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="img/costos.jpg" class="card-img-top" alt="..."  width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title">Costos Fijos</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onCostos}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="img/pqrs.jpg" class="card-img-top" alt="..."  width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title">PQRS</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onPqrs}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="img/deuda.jpg" class="card-img-top" alt="..."  width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title">Deudas Clientes</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onDeuda}>Ingresar</Button>
                    </div>
                    </div>
                </div>
            </div>
        </>  
    )
}