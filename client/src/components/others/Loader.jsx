import React from 'react';
import {CircularProgress, Box} from '@mui/material';

const Loader = ()=>{
  return(
                <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <CircularProgress />
        </Box>
    )
}

export default Loader;