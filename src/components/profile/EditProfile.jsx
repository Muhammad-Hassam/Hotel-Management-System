import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import User from '../../assets/images/user.png'
// import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import '../style/style.css';
import { useSelector } from 'react-redux';
import {database,Storage} from '../config/firebase';
import { useHistory } from 'react-router';



const Editprofile = () => {
  const userData = useSelector((state) => state.status);  
  const [data] = useState(userData.user);
  const [url, setUrl] = useState(userData.user.imageURL);
  const history=useHistory();
  const formik = useFormik({
    initialValues: {
      uname: data.uname,
      email: data.email,
      gender: data.gender,
      imageURL: data.imageURL,
      age: data.age,
      address: data.address,
      contact: data.contact,
    },
    onSubmit: (values) => {
      const {
        uname,
        email,
        gender,
        imageURL,
        age,
        address,
        contact,
      } = values;
      database.ref("/HMS").child("user/"+data.id).update({
        uname:uname,
        email:email,
        gender:gender,
        imageURL:imageURL,
        age:age,
        address:address,
        contact:contact,
        imageURL:url,
      })
      history.push('/profile')
    },
  });

  const uploadImg = (event) => {
    let images = event.target.files[0];
    let pics = images;
    const picsname = Date.now();
    Storage.ref('picture/' + images.name + picsname)
      .put(pics)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((URL) => {
          setUrl(URL);
        });
        console.log(url);
        data.imageURL = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Grid container style={{ marginTop: '80px' }}>
        <Grid xs={12} md={12} sm={12} item>
          <Card style={{ boxShadow: '0 0 15px  #545001' }}>
            <Grid item xs={12} md={12} sm={12}>
              <h1>Profile Update</h1>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{
              paddingBottom: '20px', display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <form>
                <label for='fileToUpload'>
                  <div
                    class='profile-pic'
                    id='profilePic'
                    style={{
                      backgroundImage: `url( ${url ? url :data.imageURL?data.imageURL: User
                        } )`,
                    }}
                  >
                    <span class='glyphicon glyphicon-camera'></span>
                    <span>Change Image</span>
                  </div>
                </label>
                <input
                  type='File'
                  name='fileToUpload'
                  id='fileToUpload'
                onChange={uploadImg}
                />
              </form>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{ marginRight: '20px' }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  label='Name'
                  style={{ margin: 6, marginBottom: '20px' }}
                  placeholder='Enter your Name'
                  helperText=''
                  fullWidth
                  value={formik.values.uname}
                  onChange={formik.handleChange('uname')}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                     <TextField
                  label='Email'
                  style={{ margin: 6, marginBottom: '20px' }}
                  placeholder='Enter your Email for contact'
                  helperText=''
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                <TextField
                  label='Age'
                  style={{ margin: 8 }}
                  placeholder='Enter Your Age'
                  helperText=''
                  fullWidth
                  type='number'
                  margin='normal'
                  value={formik.values.age}
                  onChange={formik.handleChange('age')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                <Grid xs={12} md={12} sm={12} item style={{ marginLeft: '20px' }}>
                  <p style={{ textAlign: 'left' }}>Gender</p>
                  <RadioGroup
                    aria-label='gender'
                    name='gender1'
                    value={formik.values.gender}
                    onChange={formik.handleChange('gender')}
                  >
                    <FormControlLabel
                      value='Female'
                      control={<Radio />}
                      label='Female'
                    />
                    <FormControlLabel
                      value='Male'
                      control={<Radio />}
                      label='Male'
                    />
                  </RadioGroup>
                </Grid>
                <TextField
                  label='Address'
                  style={{ margin: 8 }}
                  placeholder='Enter Your Address'
                  helperText=''
                  fullWidth
                  type='text'
                  margin='normal'
                  value={formik.values.address}
                  onChange={formik.handleChange('address')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                <TextField
                  label='Contact'
                  style={{ margin: 8 }}
                  placeholder='Enter Your Contact No'
                  helperText=''
                  fullWidth
                  type='text'
                  margin='normal'
                  value={formik.values.contact}
                  onChange={formik.handleChange('contact')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                <Grid xs={12} md={12} sm={12} item>
                  <Button
                    variant='contained'
                    color='default'
                    style={{
                      marginTop: '10px',
                      marginBottom: '15px',
                      marginLeft: '10px',
                      backgroundColor: '#545001',
                      color: '#ffff'
                    }}
                    type='submit'
                  >
                    Update
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Editprofile;
