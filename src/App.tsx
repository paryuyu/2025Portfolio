import { Provider } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Connect from './components/connect';
import Home from './components/home';
import Layout from './components/layout';
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
                <Connect />
              }
            />
       
            <Route
              path={routes.window}
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
