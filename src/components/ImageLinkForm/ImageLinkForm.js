import React from 'react';
import './ImageLinkForm.css'



const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <div className='center'>
            
                <div className='pa4 br3 shadow-3 form center'>
                    
                    <input className='pa2 f4 w-70 center' type="text" onChange = {onInputChange} />
                    <button className='f4 w-30 grow link ph3 pv2 dib white bg-light-purple' onClick = {onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}



export default ImageLinkForm;