import React, { useState, useEffect } from 'react'
import './Login.css'
import {blue} from '@material-ui/core/colors'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../redux/user/userAction";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'

const Register = ({history}) => {
    const paperStyle = {padding:20, height:'80vh', width:400, margin:'100px auto'}

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
 
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);


  
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
      console.log(message)
    } else dispatch(register(name, email, password));
  };
    
    

    return (
       <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid style={{marginTop:50, marginLeft:80}}>
                    <Avatar  style={{marginBottom:10, marginLeft:60,backgroundColor:'#3f51b5', fontSize:25}}>اقرأ</Avatar>
                    
                </Grid>
            
            <TextField  
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)} 
              style={{marginTop:30}} 
              fullWidth required
              />
            <TextField  type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)} 
              style={{marginTop:10}} 
              fullWidth required/>
            <TextField 
            type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{marginTop:30}} fullWidth required/>
            <TextField 
             type="password"
             value={confirmpassword}
             placeholder="Confirm Password"
             onChange={(e) => setConfirmPassword(e.target.value)}
             style={{marginTop:10}} fullWidth required/>
            <Button variant="contained" color="primary" onClick={submitHandler} style={{marginTop:40, marginLeft:70, width:200}}>Register</Button>
        
            
            <Typography style={{marginTop:20, marginLeft:75}}>Have an account? <Link to="/login"  onClick=''>Log in</Link></Typography>
            </Paper>
       </Grid>
    )
}

export default Register