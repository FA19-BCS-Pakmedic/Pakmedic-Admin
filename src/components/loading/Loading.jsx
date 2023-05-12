import { CircularProgress } from '@mui/material'
import React from 'react'

import classes from '../../styles/Loading.module.css'

const Loading = ({message}) => {
  return (
        <div className={classes.container}>
                <CircularProgress />
                <p className={classes.message}>{message}</p>
        </div>


  )
}

export default Loading