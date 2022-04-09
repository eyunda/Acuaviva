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

    const onVision = () => {
                push('/vista/vision')
    }
    const onMision = () => {
                push('/vista/mision')
    }
    const onFactura = () => {
                push('/vista/factura')
    }
    const onPqrs = () => {
        push('/vista/pqrs')
}
    

    return (
        <>
            <h1 className="titulo">Usuarios</h1>
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col">
                    <div class="card h-110">
                    <img src="img/vision.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Vision</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onVision}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-110">
                    <img src="img/mision.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Mision</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onMision}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-110">
                    <img src="img/recibo.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Resibos</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onFactura}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-110">
                    <img src="img/pqrs.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">PQRS</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onPqrs}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                
            </div>
        </>  
    )
}
