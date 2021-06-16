import React, { useState,useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar'
import User from '../../assets/images/user.png';
import { useDispatch } from 'react-redux';
import {auth,database} from '../config/firebase'
import userStatus from '../redux/action/index';



const Hotelprofile = () => {
  const [data,setData] = useState([]);
  const dispatch = useDispatch();


  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if(user){
        database.ref("/HMS").child("user/"+auth.currentUser.uid).on('value',data => {
          setData(data.val())
          dispatch(
            userStatus({
              loginStatus: true,
              role: data.val().role,
              user:data.val(),
            })
          );
         })
      }
    }) 
  },[])

  return (
    <>
  <Grid container style={{marginTop:"70px"}}>
        <Grid xs={12} md={12} sm={12} item style={{ boxShadow: '0 0 15px  #545001' }}>
          <Card>
              <Grid xs={12} md={12} sm={12}><h1 style={{ textDecoration: 'underline' }}>Profile Info</h1></Grid>
              <Grid xs={12} md={12} sm={12} item style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Avatar alt="User Profile" src={data.imageURL?data.imageURL:User} style={{ width: "160px", height: "160px", marginTop: '10px', boxShadow: '0 0 15px  #545001' }} />
              </Grid>
            <Grid
              xs={12}
              md={12}
              sm={12}
              item
              style={{ marginTop: '5px' }}
            >
            </Grid>
            <Grid xs={12} md={12} sm={12} item>
              <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>{data.uname}</h1>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{ textAlign: 'left', paddingLeft: '40px' }}>
              <p>
                <span>
                  <b>Address: </b>
                </span>
                <span>{data.address}</span>
              </p>
              <p>
                <span>
                  <b>Email: </b>
                </span>
                <span>{data.email}</span>
              </p>
              <p>
                <span>
                  <b>Description: </b>
                </span>
                <span style={{textAlign:'center'}}>{data.description}</span>
              </p>
              <p>
                <span>
                  <b>Facility: </b>
                </span>
                <span style={{justifyContent:'center'}}>{data.facility}</span>
              </p>
              <p>
                <span>
                  <b>Total Rooms: </b>
                </span>
                <span>{data.rooms}</span>
              </p>
              <p>
                <span>
                  <b>No of Single Bed Rooms: </b>
                </span>
                <span>{data.signlebed}</span>
              </p>
              <p>
                <span>
                  <b>Per Day of Single Bed Room: </b>
                </span>
                <span>{data.singleroomprice}</span>
              </p>
              <p>
                <span>
                  <b>No of Double Bed Rooms: </b>
                </span>
                <span>{data.doublebed}</span>
              </p>
              <p>
                <span>
                  <b>Per Day of Double Bed Room: </b>
                </span>
                <span>{data.doubleroomprice}</span>
              </p>
              <p>
                <span>
                  <b>No of King Size Bed Rooms: </b>
                </span>
                <span>{data.kingsizebed}</span>
              </p>
              <p>
                <span>
                  <b>Per Day of Single Bed Room: </b>
                </span>
                <span>{data.kingroomprice}</span>
              </p>
              <p>
                <span>
                  <b>Contact No: </b>
                </span>
                <span>{data.contact}</span>
              </p>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    
    </>
  );
};
export default Hotelprofile;
