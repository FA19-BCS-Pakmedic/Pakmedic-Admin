import React from 'react';

import classes from '../../styles/Error.module.css';



const Error = ({message}) => {
  return (
    <div className={classes.container}>
        <img src="/assets/illustrations/illustration_error.jpg" alt="error illustration" />
        <p className={classes.message}>{message} {":("}</p>
    </div>
  )
}

export default Error