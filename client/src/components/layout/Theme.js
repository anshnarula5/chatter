import React from 'react'
import {createTheme, ThemeProvider} from '@mui/material';
import {useSelector} from 'react-redux';

const Theme = ({children}) => {
  const toggle = useSelector(state => state.toggle)
    const darkTheme = createTheme({
        palette: {
          mode: toggle ? "dark" : "light",
        },
      });
    return (
        <ThemeProvider theme={darkTheme}>
            {children}
       </ThemeProvider>
    )
}

export default Theme

