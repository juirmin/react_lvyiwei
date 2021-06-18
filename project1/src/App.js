import logo from './logo.svg';
import './App.css';
import React from 'react';

import Button from '@material-ui/core/Button'; //詳細指定import
import { FormControlLabel, ButtonGroup, Typography, Box } from '@material-ui/core'; //不詳細指定import -> 用{}
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { FaUpload, FaDownload } from "react-icons/fa";
import { RiGameFill, RiGameLine } from "react-icons/ri";

const Mytheme = createMuiTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: orange[400],
    },
  }
})

const BarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const BottonStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg,#333,#999)',
    border: 0,
    borderRadius: 15,
    color: 'white',
    padding: '5px 30px',
    marginBottom: 10,
  }
})

const FieldStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function ButtonCom() {
  const classes = BottonStyles(); //hook寫法
  return (
    <Button className={classes.root}>
      Button Styled
    </Button>
  )
}

function TextFieldCom() {
  const classes = FieldStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-secondary"
        label="Password"
        variant="outlined"
        color="secondary"
        defaultValue="Please Input Here"
      />
    </form>
  );
}

function CheckBoxCom() {
  const [checked, setChecked] = React.useState(true);

  return (
    <FormControlLabel
      control={<Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />}
      label="Checkbox"
    />
  )
}

function AppBarCom() {
  const classes = BarStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SimpleMenu />
          <Typography variant="h6" className={classes.title}>
            C108156120
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div >
  );
}

function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AppBarCom />
      <header className="App-header">
        <ThemeProvider theme={Mytheme}>
          <Typography>
            <Box fontWeight="fontWeightBold" fontSize={50} textAlign="center" lineHeight={2}>Welcome to my-ui-app</Box>
            <Box fontWeight="fontWeightBold" fontSize={50} textAlign="center" lineHeight={2}>
              <RiGameFill /><RiGameLine /><RiGameFill /><RiGameLine /><RiGameFill /><RiGameLine /><RiGameFill />
              <RiGameLine /><RiGameFill /><RiGameLine /><RiGameFill /><RiGameLine /><RiGameFill />
            </Box>
          </Typography>
          <CheckBoxCom />
          <TextFieldCom />
          <ButtonCom />
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button><FaUpload />　Upload</Button>
            <Button><FaDownload />　Download</Button>
          </ButtonGroup>
        </ThemeProvider>

        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div >
  );
}

export default App;