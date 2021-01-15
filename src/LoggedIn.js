import SideBar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import TopBar from './TopBar';
import ListPage from './ListPage';
import Pick from './components/pick/Pick';
import { PickStateProvider } from './components/pick/pick-state';
import PickReducer, { initialState } from './components/pick/pickReducer';
import { Helmet } from 'react-helmet';

// import { useAuthState } from './auth-state';
// const [, dispatch] = useAuthState();
//title.js or useTitle.js
const Title = ({ children: title }) => {
  const defaultTitle = 'xPick';
  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
    </Helmet>
  );
};

const LoggedIn = () => {
  // const { taskId } = useParams();
  return (
    <div className='layout'>
      <Router>
        <SideBar>{/* <SideBar.Action to='list' faIcon={faList} /> */}</SideBar>
        <Route path='/'>
          <TopBar />
        </Route>
        <div className='content'>
          <Route path='/' exact>
            <Title>xPick | Assigned Picks</Title>
            <ListPage />
          </Route>
          <Route path='/picks'>
            <Title>xPick | Assigned Picks</Title>
            <ListPage />
          </Route>
          <Route path='/pick/:taskId'>
            <Title>{`xPick | Pick`}</Title>
            <PickStateProvider
              reducer={PickReducer}
              initialState={initialState}>
              <Pick />
            </PickStateProvider>
          </Route>
        </div>
      </Router>
    </div>
  );
};

export default LoggedIn;
