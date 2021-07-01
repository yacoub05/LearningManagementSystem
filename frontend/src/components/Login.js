import React ,{useEffect, useState} from 'react'
import './Login.css'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/user/userAction';
import { Link } from "react-router-dom";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import axios from 'axios'
import api from '../api'




const Login = ({history}) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

    const [state, setState] = useState({
        email: "",
        password: ""
      })
      
      useEffect(() => {
        if (userInfo) {
          history.push("/assignment");
        }
      }, [history, userInfo]);

     
      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
      };

      
    const paperStyle = {padding:20, height:'70vh', width:300, margin:'100px auto'}
    return (
       <Grid>
         {error && <h1>error</h1>}
         {loading && <h1>loading</h1>}
            <Paper elevation={5} style={paperStyle}>
                <Grid style={{marginTop:50, marginLeft:80}}>
                    <Avatar  style={{marginBottom:20, marginLeft:20,backgroundColor:'#3f51b5', fontSize:25}}>اقرأ</Avatar>
                    <h2>Sign In</h2>
                </Grid>
            <form onSubmit ={submitHandler}>
            <TextField 
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)} 
              label='email'
              style={{marginTop:30}} f
              ullWidth required
              />
            <TextField 
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} 
              label='password'
              style={{marginTop:10}} 
              fullWidth required
              />
            {/* <Button  onClick = {handleSubmit} variant="contained" color="primary"  style={{marginTop:40, marginLeft:30, width:200}}>Login</Button> */}
            
            <button>Login</button>
            </form>
            
            <Typography style={{marginTop:20}}>Don't have an account? <Link to="/register"  onClick=''>Register</Link></Typography>
            </Paper>
       </Grid>
    )
}

export default Login
