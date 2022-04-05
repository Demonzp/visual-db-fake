import { Routes, Route } from 'react-router-dom';
import DbManagerMain from './components/db-manager-main';
import DbManagerTableMain from './components/db-manager-table-main';
import DbManagerTableTabs from './components/db-manager-table-tabs';
import DbManagerTables from './components/db-manager-tables';
import NavHead from './components/nav-head';
import UnSave from './middelwares/UnSave';
import DbManager from './pages/db-manager';
import Home from './pages/home';
import { ERoutes } from './types/rotutes';

export enum ETableTab {
  MANAGER = 'manager',
  STRUCTURE = 'structure',
};

export type TUrlParamsDbManager = {
  dbId?:EUrlParamsDbManager.dbId,
  tableName?:EUrlParamsDbManager.tableName
  tableTab?:ETableTab
}

export enum EUrlParamsDbManager {
  dbId='dbId',
  tableName='tableName',
  tableTab = 'tableTab'
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
          <Route index element={<DbManagerMain />} />
          <Route path={`:${EUrlParamsDbManager.dbId}`} >
            <Route index element={<DbManagerTables />} />
            <Route path={`:${EUrlParamsDbManager.tableName}`} element={<DbManagerTableMain />}>
              <Route path={`:${EUrlParamsDbManager.tableTab}`} element={<DbManagerTableTabs />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
      {/* <Routes>
        <Route path={ERoutes.HOME}>
          <Route 
            index 
            element={
              <UnSave>
                <Home />
              </UnSave>
            } 
          />
          <Route
            path={ERoutes.DB_CREATOR}
            element={
              <UnSave>
                <DbManager />
              </UnSave>
            }
          >
            <Route index element={<DbManagerMain />} />
            <Route path={`:${EUrlParamsDbManager.dbId}`} >
              <Route index element={<DbManagerTables />} />
              <Route path={`:${EUrlParamsDbManager.tableName}`} element={<DbManagerTableMain />}>
                <Route path={`:${EUrlParamsDbManager.tableTab}`} element={<DbManagerTableTabs />}/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
