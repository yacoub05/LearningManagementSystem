import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
    
    return (
        <div>
            <h1>THIS IS JUST A SIMPLE HOME PAGE TO GET STARTED</h1>
            <p>So why dont we get started this is a project where you can login and register for an online learning system</p>
            <p>login below</p>
            <Button ><Link to="/login"  onClick=''>Log in</Link></Button>
            <Button ><Link to="/register"  onClick=''>Register</Link></Button>
        </div>
    )
}

export default Home
