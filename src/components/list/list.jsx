import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { database } from '../config/firebase';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


export default function AlignItemsList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    database.ref("/HMS").child("user").on('value', snapshot => {
      if(snapshot.exists()){
      setData(Object.values((snapshot.val())))
      }
      else{
      setData([])
      }
    })
  }, [])
  const classes = useStyles();
  let hoteldata=[]
  if(data){
  hoteldata = data.filter(data => data.role == 'hotel')
}
  else{
    hoteldata = [];
  }
  return (
    <Container fixed style={{marginTop:'60px'}}>
      <Grid sm={12} md={12} xs={12}>
        {hoteldata.map((product, index) => {
          return(
            <List style={{marginTop: '40px', boxShadow: '0 0 15px  #545001',marginBottom:'90px'}} key={index}>
            <ListItem style={{justifyContent:'center',marginBottom:'0'}}>
            <h2 style={{textDecoration:'underline'}}>{product.uname}</h2>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{
                  width: '160px',
                  height: '160px',
                }} alt="Remy Sharp" src={product.imageURL} />
              </ListItemAvatar>
              <p style={{marginLeft:'20px'}}>{product.description}</p>
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
            <Button style={{backgroundColor:'#545001' ,color:'#fff'}} variant="contained">
            <Link
                      to={{
                        pathname: `/hoteldetail/${product.id}`,
                        state: product,
                      }}
                      style={{ color: '#fff', textDecoration: 'none'}}
                    >
              Check
              </Link>
              </Button>
            </ListItem>
          </List>
          )
        })}
      </Grid>
    </Container>
  );
}