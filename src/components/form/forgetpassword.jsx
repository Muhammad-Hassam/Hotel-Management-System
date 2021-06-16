import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Header from '../header';
import Footer from '../footer';
import {auth} from '../config/firebase';
import * as Yup from 'yup';

const SignUp = () => {
 
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .email('Email is invalid')
        .required('Email is Required!'),
    }),
    onSubmit: (values) => {
      const { email } = values;
  auth.sendPasswordResetEmail(email).then(()=>{
      alert("Kindly Check Your email")
  }).catch((err)=>console.log(err))
      }
    })

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
              </Grid>
              <Grid container>
                <Grid xs={6} md={6} sm={6} item style={{textAlign:"left"}}>
                  <Button
                    variant='contained'
                    color='default'
                    style={{
                      marginTop: '10px',
                      marginBottom: '15px',
                      backgroundColor:'#545001',
                      marginLeft:'20px',
                      color:'#fff'
                    }}
                    type='submit'
                  >
                   Send
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