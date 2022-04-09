import React, { useState, useEffect } from 'react'
import './Inicio.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './vision.jpg'
import axios from 'axios'
import { Button } from '@mui/material'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

const Vistavi = () => {

    const [vistaviList, setVistaviList] = useState([])

    const getVistavi = async () => {
        const { data } = await axios.get('http://localhost:4000/api/vision')
        setVistaviList(data)
    }

    useEffect(getVistavi, [])

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
            <h1 className="titulo">VISION</h1>
                {vistaviList.map((user, index) => (
                    <div class="row" key={index}>
                    <div class="col-6">
                        <img src = {Logo} class="card-img-top" height="70%"/>
                    </div>
                    <div class="col-6">
                        <p>{user.vision}</p>
                    </div>
                    </div>
                    
                ))}
        </>  
    )
}
export default Vistavi