import SideBar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { faList } from '@fortawesome/pro-regular-svg-icons';
import TopBar from './TopBar';
import ListPage from './ListPage';
import Pick from './components/pick/Pick';
import { PickStateProvider } from './components/pick/pick-state';
import PickReducer, { initialState } from './components/pick/pickReducer';

// import { useAuthState } from './auth-state';
// const [, dispatch] = useAuthState();

const LoggedIn = () => {
  return (
    <div className='layout'>
      <Router>
        <SideBar>{/* <SideBar.Action to='list' faIcon={faList} /> */}</SideBar>
        {/* <TopBar /> */}
        <div className='content'>
          <Route path='/' exact>
            {/* <ListPage /> */}
            <PickStateProvider reducer={PickReducer} initialState={initialState}>
              <Pick />
            </PickStateProvider>
          </Route>
        </div>
      </Router>
    </div>
  );
};

export default LoggedIn;
