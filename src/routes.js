//import Home from './pages/Home'
//import About from './pages/About'

import { lazy } from './app'
const Home = await lazy(() => import('./pages/Home'))
const About = await lazy(() => import('./pages/About'))

export default [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
]
