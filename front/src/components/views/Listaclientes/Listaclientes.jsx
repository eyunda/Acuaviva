import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

const Listaclientes = () => {
	const initialState = {
		nombre: "",
		apellido: "",
        edad: "",
        telefono: "",
        correo: "",
        username: "",
        password: "",
        rol: "",

	}
	const [listacliList, setListacliList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/listacli')
		setListacliList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 50 },
		{ field: 'nombre', headerName: 'Nombre', width: 90 },
        { field: 'apellido', headerName: 'Apellido', width: 90 },
        { field: 'documento', headerName: 'Documento', width: 90 },
		{ field: 'predio', headerName: 'Ext.predio', width: 90 },
		{ field: 'tipo_vivienda', headerName: 'Ubicacion', width: 90 },
        { field: 'telefono', headerName: 'Telefono', width: 120 },
        { field: 'correo', headerName: 'Correo', width: 150 },
		{ field: 'username', headerName: 'Username', width: 90 },
        { field: 'password', headerName: 'Password', width: 90 },
        { field: 'rol', headerName: 'Rol', width: 90 },
		{ field: 'estrato', headerName: 'Estrato', width: 90 },
		{
			field: '',
			headerName: 'Acciones',
			width: 150,
			renderCell: (params) => (
					<Stack direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
					<IconButton size='small' onClick={() => {
						setIsEdit(true)
						setBody(params.row)
						handleDialog()
					}}>
						<EditOutlined />
					</IconButton>
					<IconButton size='small' onClick={() => onDelete(params.id)}>
						<DeleteOutline />
					</IconButton>
				</Stack>
			)
		}
	]

	const onDelete = async (id) => {
		try {
			const { data } = await ApiRequest().post('/listacli/eliminar', { id: id })
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const handleDialog = () => {
		setOpenDialog(prev => !prev)
	}

	const onChange = ({ target }) => {
		const { name, value } = target
		setBody({
			...body,
			[name]: value
		})
	}

	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/listacli/guardar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
			setIsEdit(false)
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const onEdit = async () => {
		try {
			const { data } = await ApiRequest().post('/listacli/editar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
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
                push('/app')
    }
    

	return (
		<>
            <Button fullWidth variant='contained' color='secondary' className={classes.button} onClick={onAtras}>Regresar</Button>
			<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog}>
				<DialogTitle>
					{isEdit ? 'Editar Cliente' : 'Crear Cliente'}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={9} sm={9}>
							<TextField
								margin='normal'
								name='nombre'
								value={body.nombre}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Nombre'
							/>
						</Grid>
                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='apellido'
								value={body.apellido}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Apellido'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='documento'
								value={body.documento}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Documento'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='predio'
								value={body.predio}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Ext.predio'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='tipo_vivienda'
								value={body.tipo_vivienda}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Ubicacion'
							/>
						</Grid>
                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='telefono'
								value={body.telefono}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Telefono'
							/>
						</Grid>
                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='correo'
								value={body.correo}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Correo'
							/>
						</Grid>
                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='username'
								value={body.username}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Username'
							/>
						</Grid>
                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='password'
								value={body.password}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Password'
							/>
						</Grid>
                        <Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='id_rol'
								value={body.id_rol}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='id_Rol'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='id_estrato'
								value={body.id_estrato}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='id_estrato'
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
			<Page title="Acuaviva | Lista Clientes">
				<ToastAutoHide message={mensaje} />
				<Container maxWidth='lg'>
					<Box sx={{ pb: 5 }}>
						<Typography variant="h5">Lista de Clientes</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo</Button>
						</Grid>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12} sm={12}>
							<CommonTable data={listacliList} columns={columns} />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</>
	)
}

export default Listaclientes

