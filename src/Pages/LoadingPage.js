import React from 'react'
import { CircularProgress } from '@mui/material';

function LoadingPage() {
  return (
    <div className='ctn-loader'>
        <CircularProgress/>
    </div>
    )
}

export default LoadingPage;