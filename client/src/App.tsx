import { Routes, Route } from 'react-router-dom';
import NavHead from './components/nav-head';
import DbManager from './pages/db-manager';
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
          element={<DbManager />}
        />
      </Routes>
    </div>
  );
}

export default App;
