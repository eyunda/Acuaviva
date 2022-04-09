import React, { useState, useEffect } from 'react'
import ApiRequest from '../../../helpers/axiosInstances'
import MaterialTable from 'material-table'
import PrintIcon from '@material-ui/icons/Print'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Button} from '@mui/material'


function Factura() {
	const [listafactura, setFacturaList] = useState([])
	
	const init = async () => {
		const { data } = await ApiRequest().get('/factura')
		setFacturaList(data)
	}
  	const columns = [
    		{ title: "Nombre", field: "nombre", },
    		{ title: "Apellido", field: "apellido", },
    		{ title: "Edad", field: "edad", type: "numeric" },
    		{ title: "Telefono", field: 'telefono', type: "numeric" },
		{ title: "Estrato", field: "estrato", },
		{ title: "Descuento", field: "descuento", },
		{ title: "Costos Fijos", field: "costos", },
		{ title: "Valor Costo Fijo", field: "valor", },
		{ title: "Consumo", field: "Consumo", },
		{ title: "Deuda Anterior", field: "deuda_anterior", },
		{ title: "Lectura Anterior", field: "lectura_pasada", },
		{ title: "Lectura Actual", field: "lectura_resiente", },
		{ title: "Total", field: "Total", },
		
	]

  	const downloadPdf = () => {
    		const doc = new jsPDF()
    		doc.text("Factura de Acuaviva", 20, 10)
    		doc.autoTable({
      		theme: "grid",
      		columns: columns.map(col => ({ ...col, dataKey: col.field })),
      		body: listafactura
    		})
    		doc.save('table.pdf')
  	}
	
	useEffect(init, [])

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
    	<div className="App">
		<Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onAtras}>Regresar</Button>
		<h1 align="center">Factura de Acuaviva</h1>
		<MaterialTable
			title="Acuaviva"
			columns={columns}
			data={listafactura}
			actions={[
				{
					icon: () => <PrintIcon />,// you can pass icon too
					tooltip: "Descargar en PDF",
					onClick: () => downloadPdf(),
					isFreeAction: true
				}
			]}

		/>
    	</div>
  );
}

export default Factura;

