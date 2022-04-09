import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

const Mision = () => {
	const initialState = {
		mision: "",
	}
	const [misionList, setMisionList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/mision')
		setMisionList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 50 },
		{ field: 'mision', headerName: 'Mision', type: 'text', width: 800 },
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
			const { data } = await ApiRequest().post('/mision/eliminar', { id: id })
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
			const { data } = await ApiRequest().post('/mision/guardar', body)
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
			const { data } = await ApiRequest().post('/mision/editar', body)
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
					{isEdit ? 'Editar Mision' : 'Crear Mision'}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={9} sm={9}>
							<TextField
								margin='normal'
								name='mision'
								value={body.mision}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Mision'
							/>
						</Grid>
                        
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
			<Page title="Acuaviva | Usuarios">
				<ToastAutoHide message={mensaje} />
				<Container maxWidth='lg'>
					<Box sx={{ pb: 5 }}>
						<Typography variant="h5">Mision</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo</Button>
						</Grid>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12} sm={12}>
							<CommonTable data={misionList} columns={columns} />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</>
	)
}

export default Mision

