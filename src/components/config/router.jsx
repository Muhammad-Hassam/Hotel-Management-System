import Home from '../home/home';
import Signup from '../form/signup';
import Login from '../form/login';
import Hoteldetails from '../hotel/hoteldetail'
import Dashboard from '../dashboard/userdashboard';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Footer from '../footer'


const Routers = () => {
  const userData = useSelector((state) => state.status);
  console.log(userData)
  return (
    <Router>
             <Switch>

            {userData.loginStatus===true ? <Dashboard/>:
            <>
             <Route exact path='/' component={Home} />
             <Route path='/signup' component={Signup} />
             <Route path='/login' component={Login} />
             <Route path='/hoteldetail/:id' component={Hoteldetails} />
              <Route path='*'>
               <Redirect to='/' />
             </Route>
             </>
           }
           <Footer/>
           </Switch>
    </Router>
  );
};
export default Routers;
