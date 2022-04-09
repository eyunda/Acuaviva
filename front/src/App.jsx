import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from './routes/RouteUtils'
import routes from './routes/routes'
import { CssBaseline, LinearProgress } from '@mui/material'
import MainContextProvider from './Context/MainContext'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme.js'


const App = () => {

	return (
		<ThemeProvider theme={theme}>
			<MainContextProvider>
				<CssBaseline />
				<Router>
				<Suspense fallback={
					
					<div class="col-md-12">
						<div class="col-4"></div>
						<div class="col-4">
							<center>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<img src="img/cargando.gif" height="150" width="150" />Cargando...
							</center>
						</div>
						<div class="col-4"></div>
					</div>
				}>
					{renderRoutes(routes)}
				</Suspense>
			</Router>
			</MainContextProvider>
		</ThemeProvider>
	)
}

export default App