import Home from '../home/home';
import Signup from '../form/signup';
import Login from '../form/login';
import Hoteldetails from '../hotel/hoteldetail'
import Dashboard from '../dashboard/userdashboard';
import Googlelogin from '../form/googlelogin'
import Forgetpassword from '../form/forgetpassword'
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

            {userData.loginStatus===true&&userData.role!=="" ? <Dashboard/>:userData.loginStatus===true&&userData.role===""?<Googlelogin/>:
            <>
             <Route exact path='/' component={Home} />
             <Route path='/signup' component={Signup} />
             <Route path='/login' component={Login} />
             <Route path='/dashboard' component={Dashboard}/>
             <Route path='/forgetpassword' component={Forgetpassword}/>
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
