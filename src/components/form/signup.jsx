import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import Header from '../header';
import Footer from '../footer';
import Swal from 'sweetalert2';
import {database,auth} from '../config/firebase'
import * as Yup from 'yup';
const SignUp = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
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
      const { email, password, role } = values;
    auth.createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          if(role==='user'){
            database.ref("/HMS").child("user/"+user.uid).set({
              id:user.uid,
              email:"N/A",
              uname:"N/A",
              role:"user",
              imageURL:'',
              age:0,
              gender:'N/A',
              address:"N/A",
              contact:'N/A'
          }) .then(()=>console.log("User added successfully"))
          .catch((err)=>console.log(err));
        }
        else{
          database.ref("/HMS").child("user/"+user.uid).set({
            id:user.uid,
            role:"hotel",
            uname:"N/A",
            imageURL:'',
            facility:'N/A',
            rooms:0,
            singleroomprice:0,
            doubleroomprice:0,
            kingroomprice:0,
            address:"N/A",
            signlebed:0,
            doublebed:'N/A',
            kingsizebed:0,
            contact:'N/A',
            description:"N/A",
        }) .then(()=>console.log("User added successfully"))
        .catch((err)=>console.log(err));
        }
        })
        .catch(error => alert(error.message))
    },
  });

  return (
    <>
    <Header/>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          style={{ marginTop: '25px'}}
        >
          <Grid xs={0} md={4} sm={0}></Grid>
          <Grid xs={12} md={4} sm={12} item>
            <Card style={{boxShadow:'0 0 15px  #545001'}}>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                style={{ textDecoration:'underline' }}
              >
                <h1>Signup</h1>
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
              <Grid xs={12} md={12} sm={12} style={{ marginRight: '15px' }}>
                <FormControl
                  variant='filled'
                  fullWidth
                  style={{ marginLeft: 8, marginTop: 18, marginBottom: 15 }}
                >
                  <InputLabel id='demo-simple-select-filled-label'>
                    SignUp As
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    value={formik.role}
                    onChange={formik.handleChange('role')}
                  >
                    <MenuItem value='hotel'>Hotel admin</MenuItem>
                    <MenuItem value='user'>User</MenuItem>
                  </Select>
                </FormControl>
                {formik.errors.role && formik.touched.role && (
                  <p style={{ color: 'red', marginLeft: '5px' }}>
                    {formik.errors.role}
                  </p>
                )}
              </Grid>
              <Grid container>
                <Grid xs={12} md={12} sm={12} item>
                  <Button
                    variant='contained'
                    color='default'
                    style={{
                      marginTop: '10px',
                      marginBottom: '15px',
                      backgroundColor:'#545001',
                      color:'#fff'
                    }}
                    type='submit'
                  >
                    Signup
                  </Button>
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