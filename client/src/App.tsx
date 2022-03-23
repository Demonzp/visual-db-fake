import { Routes, Route } from 'react-router-dom';
import NavHead from './components/nav-head';
import DbCreator from './pages/db-creator';
import Home from './pages/home';
import { ERoutes } from './types/rotutes';

const App = () => {
  return (
    <div className="App">
      <NavHead />
      <Routes>
        <Route
          path={ERoutes.HOME}
          element={<Home />}
        />
        <Route
          path={ERoutes.DB_CREATOR}
          element={<DbCreator />}
        />
      </Routes>
    </div>
  );
}

export default App;
