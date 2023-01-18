export const primary_color = '#6ea6df'
export const title_color = "#24262D"
export const text_color = "#727171"
// const main = '#566673'
const colorInMainBackground = 'white'

export const allStyles = {


  // Login Page
  loginPage: {
    width: '100%',
    height: '90vh'
  },

  loginBox: {
    height: 500
  },
  signupBox: {
    height: 500
  },


  // Loading Page Asset
  pageLoading: {
    height: '90vh',
    width: '100%'
  },

  // Refresh Button
  refressButton: {
    py: '10px',
    px: '18px',
    color: 'lightGray',
    fontWeight: 'normal',
    borderRadius: '7px',
    textTransform: 'none',
    ':hover': {
      color: 'gray'
    }
  },




// Material UI Theme 
  muiTheme: {
    palette: {
      primary: {
        main: primary_color
      }
    }
  }
}
