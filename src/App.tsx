import { Provider } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Desktop from './components/Desktop';
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
                <Desktop />
              }
            />
       
            <Route
              path={routes.window}
              element={
                <Desktop />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
