import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import {database,auth,firebase} from '../config/firebase';
import {useDispatch} from 'react-redux';
import userStatus from '../redux/action/index';
import Header from '../header';
import Footer from '../footer';
import * as Yup from 'yup';



const SignUp = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const dispatch = useDispatch();
  const [User, setUser] = useState([])
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is Required!'),
      password: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required!'),
      role: Yup.string().min(3, 'Select an option'),
    }),
    onSubmit: (values) => {
      const { email, password} = values;
      auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        database.ref("/HMS").child("user/"+auth.currentUser.uid).on('value',data => {
          setUser(data.val())
          console.log(data.val());
          dispatch(
            userStatus({
              loginStatus: true,
              role: data.val().role,
              user:data.val(),
            })
          );
         }) 
      })
      .catch(error => alert(error.message))
    },
  });

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then(({ user }) => {
      database.ref("/HMS").child("user/"+user.uid).on('value',data => {
        setUser(data.val())
        // console.log(data.val());
        dispatch(
          userStatus({
            loginStatus: true,
            role: data.val().role,
            user:data.val(),
          })
        );
       }) 
      .then(()=>console.log('datasaved'))
      .catch((err)=>console.log(err))
    }).catch((error) => {
      console.log(error.message);
    })
  }

  return (
    <>
    <Header/>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          style={{ marginTop: '25px', height: '464px', alignItems: 'center' }}
        >
          <Grid xs={0} md={4} sm={0}></Grid>
          <Grid xs={12} md={4} sm={12} item>
            <Card style={{boxShadow:'0 0 15px  #545001'}}>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                style={{ textAlign: 'center' }}
              >
                <h1>Login</h1>
              </Grid>
              <Grid xs={12} md={12} sm={12} style={{ marginRight: '15px' }}>
                <TextField
                  label='Email'
                  style={{ margin: 8, marginBottom: '20px' }}
                  placeholder='Enter your email'
                  helperText=''
                  fullWidth
                  value={formik.values.email}
                  margin='normal'
                  onChange={formik.handleChange('email')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                {formik.errors.email && formik.touched.email && (
                  <p style={{ color: 'red', marginLeft: '5px' }}>
                    {formik.errors.email}
                  </p>
                )}
                <TextField
                  label='Password'
                  style={{ margin: 8 }}
                  placeholder='Enter your Password'
                  helperText=''
                  type='password'
                  onChange={formik.handleChange('password')}
                  fullWidth
                  value={formik.values.password}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                {formik.errors.password && formik.touched.password && (
                  <p style={{ color: 'red', marginLeft: '5px' }}>
                    {formik.errors.password}
                  </p>
                )}
              </Grid>
              <Grid container>
                <Grid xs={4} md={4} sm={4} item>
                  <Button
                    variant='contained'
                    color='default'
                    style={{
                      marginTop: '10px',
                      marginBottom: '15px',
                      backgroundColor:'#545001',
                      color:'#fff',
                    }}
                    type='submit'
                  >
                    Login
                  </Button>
                </Grid>
                <Grid xs={2} md={2} sm={2} item></Grid>
                <Grid xs={6} md={6} sm={6} item>
                  <Button
                    variant='contained'
                    color='default'
                    style={{
                      marginTop: '10px',
                      marginBottom: '15px',
                      backgroundColor:'#545001',
                      color:'#fff',
                      marginLeft:'10px',
                    }}
                    onClick={signInWithGoogle}
                  >
                    Google login
                  </Button>
                  </Grid>
                  <Grid container>
                <Grid xs={6} md={6} sm={6} style={{ marginTop: '15px',marginBottom:'15px',textAlign:'center' }} item>
                  <Link 
                    style={{ color: '#000', textAlign:'left'}} 
                     to='/signup' 
                   >
                    Not have account!
                  </Link>
                  </Grid>
                  <Grid xs={6} md={6} sm={6} style={{ marginTop: '15px',marginBottom:'15px',textAlign:'center' }} item> 
                  <Link 
                    style={{ color: '#000', textAlign:'right'}} 
                     to='/forgetpassword' 
                   >
                    Forget Password!
                  </Link> 
                </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={0} md={4} sm={0}></Grid>
        </Grid>
      </form>
      <Footer/>
    </>
  );
};
export default SignUp;