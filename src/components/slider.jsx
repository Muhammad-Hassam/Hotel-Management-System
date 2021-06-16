import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import bg1 from '../assets/images/bg-1.jpg'
import Grid from '@material-ui/core/Grid';
import '../components/style/style.css'

const images = [
   bg1,
];
const Slider = () => {
  return (
    <div>
         <div className="slide-container">
          <div className="each-slide">
            <div className="slider">
                <Grid xs={8} sm={8} md={8}>
              <h1 className='heading'>Check into another plane of existence !</h1>
              </Grid>
            </div>
          </div>

      </div>
   
    </div>
  );
}

export default Slider;
