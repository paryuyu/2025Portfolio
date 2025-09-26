import { Provider } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AboutMe from './components/about';
import Connect from './components/connect';
import Home from './components/home';
import Layout from './components/layout';
import Projects from './components/projects';
import { routes } from './utils/routes';
import TransitionComponent from './utils/translationContext';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            TransitionComponent
            <Route
              path={routes.home}
              element={
                <TransitionComponent>
                  <Home />
                </TransitionComponent>
              }
            />
            <Route
              path={routes.projects}
              element={
                <TransitionComponent>
                  <Projects />
                </TransitionComponent>
              }
            />
            <Route
              path={routes.about}
              element={
                <TransitionComponent>
                  <AboutMe />
                </TransitionComponent>
              }
            />
            <Route
              path={routes.connect}
              element={
                <TransitionComponent>
                  <Connect />
                </TransitionComponent>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
