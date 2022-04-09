import React, { lazy } from 'react'
import { HomeRedirect } from './RouteUtils'
import RouteController from './RouteController'
const Dashboard = lazy(() => import('../components/views/Dashboard'))
const Login = lazy(() => import('../components/views/Login'))
const Home = lazy(() => import('../components/views/Home'))
const Inicio = lazy(() => import('../components/views/Trabajador'))
const Cafe = lazy(() => import('../components/views/Cafe'))
const Principal = lazy(() => import('../components/views/Principal'))
const Cliente = lazy(() => import('../components/views/Cliente'))
const Vista = lazy(() => import('../components/views/Vista'))
const Listatra = lazy(() => import('../components/views/Listatrabajadores'))
const Listacli = lazy(() => import('../components/views/Listaclientes'))
const Mision = lazy(() => import('../components/views/Mision'))
const Vision = lazy(() => import('../components/views/Vision'))
const Costos = lazy(() => import('../components/views/Costos'))
const Pqrs = lazy(() => import('../components/views/Pqrs'))
const Vistavi = lazy(() => import('../components/views/Vistavi'))
const Vistami = lazy(() => import('../components/views/Vistami'))
const Factura = lazy(() => import('../components/views/Factura'))
const Ver = lazy(() => import('../components/views/Ver'))
const Imagen = lazy(() => import('../components/views/Imagen'))
const Estados = lazy(() => import('../components/views/Estados'))

const routes = [
    {
        path: "/",
        exact: true,
        component: HomeRedirect
    },
    
    
    {
        path: "/mision",
        exact: true,
        render: props => <Vistami {...props} />
    },
    {
        path: "/principal",
        exact: true,
        render: props => <Principal {...props} />
    },
    {
        path: "/login",
        exact: true,
        render: props => <Login {...props} />
    },
    {
        path: "/trabajador",
        exact: true,
        render: props => <Inicio {...props} />
    },
    {
        path: "/cliente",
        exact: true,
        render: props => <Cliente {...props} />
    },
    {
        path: "/app",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/app",
                exact: true,
                render: props => <RouteController component={Dashboard} {...props} />
            },
            {
                path: "/app/listatra",
                exact: true,
                render: props => <RouteController component={Listatra} {...props} />

            },
            {
                path: "/app/listacli",
                exact: true,
                render: props => <RouteController component={Listacli} {...props} />

            },
            {
                path: "/app/mision",
                exact: true,
                render: props => <RouteController component={Mision} {...props} />

            },
            {
                path: "/app/vision",
                exact: true,
                render: props => <RouteController component={Vision} {...props} />

            },
            {
                path: "/app/costos",
                exact: true,
                render: props => <RouteController component={Costos} {...props} />

            },
            {
                path: "/app/pqrs",
                exact: true,
                render: props => <RouteController component={Estados} {...props} />

            },
            

        ]
    },
    {
        path: "/cafe",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/cafe",
                exact: true,
                render: props => <RouteController component={Cafe} {...props} />
            },
            {
                path: "/cafe/ver",
                exact: true,
                render: props => <RouteController component={Ver} {...props} />
            },
            {
                path: "/cafe/imagen",
                exact: true,
                render: props => <RouteController component={Imagen} {...props} />
            },
        ]
    },
    {
        path: "/vista",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/vista",
                exact: true,
                render: props => <RouteController component={Vista} {...props} />
            },
            {
                path: "/vista/vision",
                exact: true,
                render: props => <Vistavi {...props} />
            },
            {
                path: "/vista/mision",
                exact: true,
                render: props => <Vistami {...props} />
            },
            {
                path: "/vista/factura",
                exact: true,
                render: props => <Factura {...props} />
            },
            {
                path: "/vista/factura/ver",
                exact: true,
                render: props => <Ver {...props} />
            },
            {
                path: "/vista/pqrs",
                exact: true,
                render: props => <Pqrs {...props} />
            },
        ]
    }

]

export default routes