// import Home from './pages/Home'
// import About from './pages/About'

import { lazy } from './app'
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

export default [
    {
        name: 'home',
        path: '/',
        exact: true,
        component: Home,
    },
    {
        name: 'about',
        path: '/about/:filter?',
        component: About,
    },
]
