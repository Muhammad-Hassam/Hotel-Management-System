import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import PersonIcon from '@material-ui/icons/Person';
import BookIcon from '@material-ui/icons/Book';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Switch, Route, Link, BrowserRouter as Router, } from "react-router-dom";
import Profile from '../profile/profile';
import Editprofile from '../profile/EditProfile';
import Booking from '../booking/booking';
import Hoteldetail from '../hotel/hoteldetail';
import Userbooking from '../hotel/userBooking';
import Hotelprofile from '../hotel/hotelprofile'
import Hotelprofileupdate from '../hotel/hoteleditprofile';
import Bookinghistory from '../hotel/bookinghistory'
import Lists from '../list/list'
import {auth} from '../config/firebase'
import {useDispatch} from 'react-redux';
import userStatus from '../redux/action/index';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const userData = useSelector((state) => state.status);
  const dispatch = useDispatch();
  let history=useHistory();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout=()=>{
    auth.signOut().then(()=>{
      dispatch(
        userStatus({
          loginStatus: false,
          role: null,
          user:null,
        })
      );
    }).catch((err)=>console.log(err))
  }
  const drawer = (
    <div>
      <div/>
      <h1 style={{color:'#000'}}>Dashboard</h1>
      <Divider />
      {userData.user.role==='hotel'?
          <List>
          <ListItem style={{color:'#000'}} component={Link} to={'/hotelprofile'}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItem>
          <ListItem style={{color:'#000'}} component={Link} to={'/hotelprofileedit'}>
            <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
            <ListItemText>Edit Profile</ListItemText>
          </ListItem>
          <ListItem style={{color:'#000'}} component={Link} to={'/userbooking'}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText>Booking</ListItemText>
          </ListItem>
          <ListItem style={{color:'#000'}} component={Link} to={'/Bookinghistory'}>
            <ListItemIcon><MenuBookIcon /></ListItemIcon>
            <ListItemText>Booking History</ListItemText>
          </ListItem>
          <ListItem onClick={()=>logout()}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText>LogOut</ListItemText>
          </ListItem>
        </List>:
          <List>
          <ListItem style={{color:'#000'}} component={Link} to={'/profile'}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItem>
          <ListItem style={{color:'#000'}} component={Link} to={'/editprofile'}>
            <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
            <ListItemText>Edit Profile</ListItemText>
          </ListItem>
          <ListItem style={{color:'#000'}} component={Link} to={'/hotellist'}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText>Hotels</ListItemText>
          </ListItem>
          <ListItem style={{color:'#000'}} component={Link} to={'/bookingHistory'}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText>View Bookings</ListItemText>
          </ListItem>
          <ListItem onClick={()=>logout()}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText>LogOut</ListItemText>
          </ListItem>
        </List>}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
       position="fixed" className={classes.appBar} style={{ backgroundColor: '#545001' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Hotel Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}

          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      <h1 style={{color:'#000'}}>Dashboard</h1>

      </nav>
      <main className={classes.content}>
        <Switch>
        <Route path='/profile' component={Profile} />
        <Route path='/editprofile' component={Editprofile} />
        <Route path='/bookingHistory' component={Booking} />
        <Route path='/hotelprofile' component={Hotelprofile} />
        <Route path='/hotelprofileedit' component={Hotelprofileupdate} />
        <Route path='/userbooking' component={Userbooking} />
        <Route exact path='/hoteldetail/:id' component={Hoteldetail} />
        <Route exact path='/hotellist' component={Lists} />
        </Switch>

        <div className={classes.toolbar} />
      </main>

      </Router>
    </div>
  );
}


export default ResponsiveDrawer;
