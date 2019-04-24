import React from 'react';

const PopUp = ({message}) => {
    return ( 
        <div className="alert alert-success">
            <p>{message}</p>
        </div>
     );
}
 
export default PopUp;