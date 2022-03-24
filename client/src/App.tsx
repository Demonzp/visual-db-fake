import { Routes, Route } from 'react-router-dom';
import DbManagerTable from './components/db-manager-table';
import DbManagerTables from './components/db-manager-tables';
import NavHead from './components/nav-head';
import DbManager from './pages/db-manager';
import Home from './pages/home';
import { ERoutes } from './types/rotutes';


export type TUrlParamsDbManager = {
  dbId?:EUrlParamsDbManager.dbId,
  tableName?:EUrlParamsDbManager.tableName
}

export enum EUrlParamsDbManager {
  dbId='dbId',
  tableName='tableName'
};

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
        >
          <Route path={`:${EUrlParamsDbManager.dbId}`} element={<DbManagerTables />} />
          <Route path={`:${EUrlParamsDbManager.dbId}/:${EUrlParamsDbManager.tableName}`} element={<DbManagerTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
