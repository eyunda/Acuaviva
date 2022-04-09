import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";

const Principal = () => {

    const useStyles = makeStyles(theme => ({
    
        button: {
            margin: theme.spacing(1, 0, 1)
        }
    }))

    const { push } = useHistory()
    const classes = useStyles()

    const onAdmin = () => {
                push('/login')
    }
    const onEmpleado = () => {
                push('/trabajador')
    }
    const onCliente = () => {
        push('/cliente')
    }
    return (
        <div>
            <center>
                <br></br>
                <br></br>
                <br></br>
                <img src="img/fondo.jpg" class="img-fluid"></img>
                <br></br>
                <br></br>

                <div class="card-group">
                    <div class="col-2"></div>
                    <div class="col-2 color='secundary">
                        <div class="card text-white bg-primary mb-2">
                            <img src="img/admin.jpg" width="225px" height="200px"/>
                        <div class="card-body">
                            <h5 class="card-title">Admin</h5>
                        </div>
                            <div class="card-footer">
                                <small class="text-muted"><Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onAdmin}>Ingresar</Button></small>
                            </div>
                        </div>
                    </div>
                    <div class="col-1"></div>
                    
                    <div class="col-2 color='secundary">
                        <div class="card text-white bg-primary mb-2">
                            <img src="img/empleado.jpg" width="225px" height="200px"/>
                        <div class="card-body">
                            <h5 class="card-title">Trabajador</h5>
                        </div>
                            <div class="card-footer">
                                <small class="text-muted"><Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onEmpleado}>Ingresar</Button></small>
                            </div>
                        </div>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-2 color='secundary">
                        <div class="card text-white bg-primary mb-2">
                            <img src="img/usuario.jpg" width="225px" height="200px"/>
                        <div class="card-body">
                            <h5 class="card-title">Usuarios</h5>
                        </div>
                            <div class="card-footer">
                                <small class="text-muted"><Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onCliente}>Ingresar</Button></small>
                            </div>
                        </div>
                    </div>
                    <div class="col-2"></div>
                </div>
                                
            </center>
        </div>
    )
}

export default Principal
