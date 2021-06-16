import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import Header from '../header';
import Footer from '../footer';
import {database,auth} from '../config/firebase';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import userStatus from '../redux/action/index';

const SignUp = () => {
  const dispatch = useDispatch();
  const history=useHistory();
  const formik = useFormik({
    initialValues: {
      role: '',
    },
    validationSchema: Yup.object({
      role: Yup.string().min(3, 'Select an option'),
    }),
    onSubmit: (values) => {
      const { role } = values;
    auth.onAuthStateChanged((user) => {
      if(user){
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
        }) .then(()=>{
        

          console.log("User added successfully")})
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
      }) .then(()=>{
        console.log("User added successfully")
      })
      .catch((err)=>console.log(err));      
    }
      }
    })
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
                <FormControl
                  variant='filled'
                  fullWidth
                  style={{ marginLeft: 8, marginTop: 18, marginBottom: 15 }}
                >
                  <InputLabel id='demo-simple-select-filled-label'>
                    Continue As
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
                    Continue
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