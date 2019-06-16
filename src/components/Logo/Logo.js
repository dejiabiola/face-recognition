import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import Skull from './skull.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
        <Tilt className="Tilt br2 shadow-2 " options={{ max : 45 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner">
                <img style={{paddingTop: '20px'}} src={Skull} alt="skull"/>
            </div>
        </Tilt>
        </div>
    )
    
}




export default Logo;