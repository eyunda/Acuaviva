import React, { useState, useEffect } from 'react'
import { Paper, Table, TableContainer,TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Logo from './logo.jpg'
import PrintIcon from '@material-ui/icons/Print'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';

const Deudas = () => {
	const [userList, setUserList] = useState([])

    	const getUsers = async () => {
        	const { data } = await axios.get('http://localhost:4000/api/deudas')
        	setUserList(data)
    	}

    	useEffect(getUsers, [])
	
	const pdfExportComponent = useRef(null);
	const contentArea = useRef(null);
	    
	const handleExportWithComponent = (event) => {
		pdfExportComponent.current.save();
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
            push('/app')
    	}

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
										<h1>Deuda de los Clientes</h1>
									</TableCell>
								</TableRow>
							</TableHead>
						</Table>
						<Table>
							<TableHead>
								<TableRow>
									<StyledTableCell><img src={Logo} width='100%' height='100%'></img></StyledTableCell>
									<StyledTableCell>Nombre</StyledTableCell>
									<StyledTableCell>Apellido</StyledTableCell>
									<StyledTableCell>Deuda Resiente</StyledTableCell>
									<StyledTableCell>Deuda Anterior</StyledTableCell>
									<StyledTableCell>Total</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{userList.map((user, index) => (
								<StyledTableRow  key={index}>
									<TableCell></TableCell>
									<TableCell>{user.nombre}</TableCell>
									<TableCell>{user.apellido}</TableCell>
									<TableCell>{user.deuda}</TableCell>
									<TableCell>{user.deuda_anterior}</TableCell>
									<TableCell>{user.Total}</TableCell>
								</StyledTableRow>
								))}
							</TableBody>
						</Table>
						
						<div className="button-area">
							<Button primary={true} onClick={handleExportWithComponent} startIcon={<PrintIcon />}>Descargar</Button>
						</div>
					</TableContainer>
				</div>
      		</PDFExport>
		
		</>

    	)
}
export default Deudas
