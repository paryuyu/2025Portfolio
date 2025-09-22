import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home'
import Layout from './components/layout'
import { routes } from './utils/routes'
import AboutMe from './components/about'
import Skills from './components/skills'
import Contact from './components/contact'
import Projects from './components/projects'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.about} element={<AboutMe />} />
          <Route path={routes.skills} element={<Skills />} />
          <Route path={routes.contact} element={<Contact />} />
          <Route path={routes.projects} element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
