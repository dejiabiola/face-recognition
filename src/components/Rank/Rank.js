import React from 'react';



    

const Rank = ({name, entries}) => {
    return (
        <div>
           <div className='white f3'>
                {`Welcome ${name}, your current entry count is ...`}
           </div>
           <div className='white f1'>
                {entries}
           </div>
           <p>I am the god of many faces. Give me an image and I will detect faces in it.</p>
        </div>
    )
}



export default Rank;