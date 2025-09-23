import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './utils/routes'
import Home from './components/home'
import Layout from './components/layout'
import AboutMe from './components/about'
import Projects from './components/projects'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.projects} element={<Projects />} />
          <Route path={routes.about} element={<AboutMe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
