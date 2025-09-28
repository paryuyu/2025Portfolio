import { Provider } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AboutMe from './components/about';
import Connect from './components/connect';
import Home from './components/home';
import Layout from './components/layout';
import Projects from './components/projects';
import { routes } from './utils/routes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={routes.home}
              element={
                <Home />
              }
            />
            <Route
              path={routes.projects}
              element={
                <Projects />
              }
            />
            <Route
              path={routes.about}
              element={
                <AboutMe />
              }
            />
            <Route
              path={routes.connect}
              element={
                <Connect />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
