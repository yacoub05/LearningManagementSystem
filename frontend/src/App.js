
import './App.css';

import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'


//components

import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard';
import Home from './components/Home'
import Assignments from './components/Assignments'
import ActivationEmail from './components/ActivationEmail';
import SingleAssignment from './components/SingleAssignment';
import CreateAssignment from './components/CreateAssignment';




function App({history}) {

  


  return (
    <Router>
      <Dashboard/>
    <main className="App">
     <Switch> 
      <Route path='/' component={Home} exact/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register}  />
      {/* <Route path="/dashboard" component={Dashboard} exact/> */}
      <Route path="/assignment" component={Assignments} />
      <Route path="/createassignment" component={CreateAssignment} />
      <Route path="/doNow/:id" component={SingleAssignment} />
      {/* <Route
        path="/mynotes"
        component={({ history }) => (
          <MyNotes search={search} history={history} />
        )}
      />
      <Route path="/note/:id" component={SingleNote} />
      <Route path="/createnote" component={CreateNote} />;
      <Route path="/profile" component={ProfileScreen} /> */}
      </Switch>
    </main>
    
  </Router>
    
  );

  // const dispatch = useDispatch()
  // const token = useSelector(state => state.token)
  // const auth = useSelector(state => state.auth)

  
}

export default App;
