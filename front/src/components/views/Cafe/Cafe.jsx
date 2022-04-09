import React from "react"
import './Inicio.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'

export default function Cafe() {
    const useStyles = makeStyles(theme => ({
    
        button: {
            margin: theme.spacing(1, 0, 1)
        }
    }))
    const classes = useStyles()
    const { push } = useHistory()

    const onVer = () => {
        push('/cafe/ver')
    }
    const onImagen = () => {
      push('/cafe/imagen')
  }
    return (
        <>
            <h1 className="titulo">Trabajador</h1>
            <div class="row row-cols-1 row-cols-md-6 g-6">
                <div class="col">
                    <div class="card h-110">
                    <img src="img/trabajadores.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Revision</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onVer}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="img/contador.jpg" class="card-img-top" alt="..." width="20px" height="150px"/>
                    <div class="card-body">
                        <h5 class="card-title" className="tituloo">Subir Evidencia</h5>
                    </div>
                    <div class="card-footer">
                        <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={onImagen}>Ingresar</Button>
                    </div>
                    </div>
                </div>
                
            </div>
        </>  
    )
}