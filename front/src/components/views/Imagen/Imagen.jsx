import React, {Fragment, useState} from 'react';
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@mui/material'

function Imagen() {

  const [file, setFile] = useState(null)

  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  const sendHandler = () => {
    if(!file){
      alert('you must upload file')
      return
    }

    const formdata = new FormData()
    formdata.append('image', file)

    fetch('http://localhost:4000/images/post', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)
  }

    const useStyles = makeStyles(theme => ({
        
        button: {
            margin: theme.spacing(1, 0, 1)
        }
    }))

    const classes = useStyles()
    const { push } = useHistory()

    const onAtras = () => {
                push('/cafe')
    }

  return (
    <Fragment>
      <Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onAtras}>Regresar</Button>
      <br></br>
      <br></br>
      <center><h1>Subir Evidencia</h1></center>
      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileinput" onChange={selectedHandler} className="form-control" type="file"/>
            </div>
            <div className="col-2">
              <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Imagen;