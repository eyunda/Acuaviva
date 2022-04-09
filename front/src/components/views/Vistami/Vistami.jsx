import React, { useState, useEffect } from 'react'
import './Inicio.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './mision.jpg'
import axios from 'axios'
import { Button } from '@mui/material'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

const Vistami= () => {
    const [vistamiList, setVistamiList] = useState([])

    const getVistami = async () => {
        const { data } = await axios.get('http://localhost:4000/api/mision')
        setVistamiList(data)
    }

    useEffect(getVistami, [])

    const useStyles = makeStyles(theme => ({
    
        button: {
            margin: theme.spacing(1, 0, 1)
        }
    }))


    const classes = useStyles()
    const { push } = useHistory()

    const onAtras = () => {
                push('/vista')
    }
    return (
        <>
            <Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onAtras}>Regresar</Button>
            <h1 className="titulo">MISION</h1>
                {vistamiList.map((user, index) => (
                    <div class="row" key={index}>
                    <div class="col-6">
                        <img src = {Logo} class="card-img-top" height="70%"/>
                    </div>
                    <div class="col-6">
                        <p>{user.mision}</p>
                    </div>
                    </div>
                    
                ))}
        </>  
    )
}
export default Vistami
