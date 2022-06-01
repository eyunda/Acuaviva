import React, { useState, useEffect, useContext } from 'react'
import './Factura.css';
import { Paper, Table, TableContainer,TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Logo from './logo.jpg'
import PrintIcon from '@material-ui/icons/Print'
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import { MainContext, APP_STATE } from '../../../Context/MainContext'

const Factura = () => {
    	
		const [user, setUser] = useState({ correo: '', name: '', cargo: '', estrato: '', Consumo: ''})
    	
		const { globalState} = useContext(MainContext)

	
	const pdfExportComponent = useRef(null);
	const contentArea = useRef(null);
	    
	const handleExportWithComponent = (event) => {
		pdfExportComponent.current.save();
	}
	  
	const handleExportWithFunction = (event) => {
		savePDF(contentArea.current, { paperSize: "A4" });
	}
	
    	const StyledTableCell = withStyles((theme) => ({
		head: {
	  		backgroundColor: theme.palette.common.black,
	  		color: theme.palette.common.white,
		},
		body: {
	  		fontSize: 14,
		},
    	}))
	(TableCell);
    
	const StyledTableRow = withStyles((theme) => ({
		root: {
				'&:nth-of-type(odd)': {
					backgroundColor: theme.palette.action.hover,
				},
			},
	}))
	(TableRow);

	const useStyles = makeStyles((theme) => ({
		table: {
		  	minWidth: 700,
		},
		button: {
			margin: theme.spacing(1),
		},
	}));

	const classes = useStyles();
	const { push } = useHistory()

    const onAtras = () => {
        push('/vista')
    }

	const init = () => {
		if (typeof globalState.auth.id === 'undefined') {
			localStorage.clear()
		} else {
			setUser(globalState.auth)
		}
	}
	useEffect(init, [])
    	return (
		<>
			
			<Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onAtras}>Regresar</Button>
			<PDFExport ref={pdfExportComponent} paperSize="A4">
        			<div ref={contentArea}>		
					<TableContainer component={Paper} elevation={2}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										<h1>Facturacion</h1>
									</TableCell>
									<TableCell>
										<h1>zona: {user.tipo_vivienda}</h1>
									</TableCell>
									<TableCell>
										<h1>Estado: {user.estado}</h1>
									</TableCell>
									
									
								</TableRow>
							</TableHead>
						</Table>
						<Table>
							<TableHead>
								<TableRow>
									<StyledTableCell><img src={Logo} width='100%' height='100%'></img></StyledTableCell>
									<StyledTableCell>Nombre Y Apellido</StyledTableCell>
									<StyledTableCell>Documento</StyledTableCell>
									<StyledTableCell>Telefono</StyledTableCell>
									<StyledTableCell>Estrato</StyledTableCell>
									<StyledTableCell>Descuento Por Estrato</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								
								<StyledTableRow>
									<TableCell></TableCell>
									<TableCell>{user.nombre}_{user.apellido}</TableCell>
									<TableCell>{user.documento}</TableCell>
									<TableCell>{user.telefono}</TableCell>
									<TableCell>{user.estrato}</TableCell>
									<TableCell>{user.descuento}</TableCell>
								</StyledTableRow>
							
							</TableBody>
						</Table>
						<Table>
							<TableHead>
								<TableRow>
									<StyledTableCell>Costo Fijo</StyledTableCell>
									<StyledTableCell>Valor del Costo fijo</StyledTableCell>
									<StyledTableCell>Lectura Anterior</StyledTableCell>
									<StyledTableCell>Lectura Actual</StyledTableCell>
									<StyledTableCell>Consumo</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								
									<TableRow>
										<TableCell>{user.costos}</TableCell>
										<TableCell>{user.valor}</TableCell>
										<TableCell>{user.lectura_pasada}</TableCell>
										<TableCell>{user.lectura_resiente}</TableCell>
										<TableCell>{user.Consumo}</TableCell>
									</TableRow>
						
							</TableBody>
						</Table>
						<Table>
							<TableHead>
								<TableRow>
									<StyledTableCell>Deuda Anterior</StyledTableCell>
									<StyledTableCell>Total</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
					
									<TableRow>
										<TableCell>{user.deuda_anterior}</TableCell>
										<TableCell>{user.Total}</TableCell>
										
									</TableRow>
							
							</TableBody>
						</Table>
						<div>
							
						</div>
					</TableContainer>
				</div>
      		</PDFExport>
			<div className="button-area">
				<Button primary={true} onClick={handleExportWithComponent} startIcon={<PrintIcon />}>Descargar</Button>
				<Button href='https://www.eaav.gov.co/Tramites/Paginas/Pago-de-Factura-de-Servicio-Acueducto-y-Alcantarillado.aspx' startIcon={<PaidIcon />}>Pago seguro</Button>
				
			</div>
		
		</>

    	)
}

export default Factura