import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import User from '../../assets/images/user.png'
// import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import '../style/style.css';
import { useSelector } from 'react-redux';
import {database,Storage} from '../config/firebase';
import { useHistory } from 'react-router';




const Hotelprofileupdate = () => {
  const userData = useSelector((state) => state.status);  
  const [data] = useState(userData.user);
  const [url, setUrl] = useState(userData.user.imageURL);
 const history=useHistory();

  const formik = useFormik({
    initialValues: {
      uname:data.uname,
      email:data.email,
      description:data.description,
      imageURL:data.imageURL,
      address:data.address,
      contact:data.contact,
      facility:data.facility,
      rooms:data.rooms,
      singlebed:data.signlebed,
      doublebed:data.doublebed,
      kingsizebed:data.kingsizebed,
    },
    onSubmit: (values) => {
      const {
        uname,
        email,
        description,
        imageURL,
        address,
        contact,
        facility,
        rooms,
        singlebed,
        doublebed,
        kingsizebed,
      } = values;
      database.ref("/HMS").child("user/"+data.id).update({
        uname:uname,
        email:email,
        imageURL:url,
        address:address,
        contact:contact,
        facility:facility,
        rooms:rooms,
        description:description,
        signlebed:singlebed,
        doublebed:doublebed,
        kingsizebed:kingsizebed,
      })
      history.push('/hotelprofile')
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
      <Grid container style={{ marginTop: '70px' }}>
        <Grid xs={12} md={12} sm={12} item>
          <Card style={{boxShadow:'0 0 15px  #545001'}}>
            <Grid item xs={12} md={12} sm={12}>
              <h1>Profile Update</h1>
            </Grid>
            <Grid container>
              <Grid xs={4} md={4} sm={4} item></Grid>
              <Grid xs={4} md={4} sm={4} item style={{ display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',paddingBottom:'20px'}}>
                <form>
                  <label for='fileToUpload'>
                    <div
                      class='profile-pic'
                      id='profilePic'
                      style={{
                        backgroundImage: `url( ${
                          url ? url:data.imageURL?data.imageURL : User
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
              <Grid xs={4} md={4} sm={4} item></Grid>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{marginRight:'20px'}}>
            
            <form onSubmit={formik.handleSubmit}>
                <TextField
                  label='Name'
                  style={{ margin: 6, marginBottom: '20px' }}
                  placeholder='Enter Hotel Name'
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
                    style={{ margin: 8 }}
                    placeholder='Enter hotel email for contact'
                    helperText=''
                    fullWidth
                    type='text'
                    margin='normal'
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                  <TextField
                    label='Address'
                    style={{ margin: 8 }}
                    placeholder='Enter Hotel address'
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
                    label='Description'
                    style={{ margin: 8 }}
                    placeholder='Enter Hotel Facilities'
                    helperText=''
                    fullWidth
                    type='text'
                    margin='normal'
                    value={formik.values.description}
                    onChange={formik.handleChange('description')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                  <TextField
                    label='Facility'
                    style={{ margin: 8 }}
                    placeholder='Enter Hotel Facilities'
                    helperText=''
                    fullWidth
                    type='text'
                    margin='normal'
                    value={formik.values.facility}
                    onChange={formik.handleChange('facility')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                  <TextField
                    label='Rooms'
                    style={{ margin: 8 }}
                    placeholder='Enter Total No of Rooms in Hotel'
                    helperText=''
                    fullWidth
                    type='number'
                    margin='normal'
                    value={formik.values.rooms}
                    onChange={formik.handleChange('rooms')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                    <TextField
                    label='Single Bed Rooms'
                    style={{ margin: 8 }}
                    placeholder='Enter Total No of single Bed Rooms'
                    helperText=''
                    fullWidth
                    type='number'
                    margin='normal'
                    value={formik.values.singlebed}
                    onChange={formik.handleChange('singlebed')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                    <TextField
                    label='Double Bed Rooms'
                    style={{ margin: 8 }}
                    placeholder='Enter Total No of Double Bed Rooms'
                    helperText=''
                    fullWidth
                    type='number'
                    margin='normal'
                    value={formik.values.doublebed}
                    onChange={formik.handleChange('doublebed')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                    <TextField
                    label='King Size Bed Rooms'
                    style={{ margin: 8 }}
                    placeholder='Enter Total No of King Size Bed Rooms'
                    helperText=''
                    fullWidth
                    type='number'
                    margin='normal'
                    value={formik.values.kingsizebed}
                    onChange={formik.handleChange('kingsizebed')}
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
                  type='telephone'
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
                    backgroundColor:'#545001',
                    color:'#ffff'
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
export default Hotelprofileupdate;
