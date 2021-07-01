import {Link, useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import React, {useState, useEffect} from 'react'
import {SidebarData} from './SidebarData'
import CloseIcon from '@material-ui/icons/Close';
import './Dashboard.css'
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { logout } from "../redux/user/userAction";
import Assignments from './Assignments';



const Dashboard = () => {

    let history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const [sidebar, setSidebar] = useState(false)
    const showSidebar =()=>setSidebar(!sidebar)
    

    const logoutHandler = () => {
        dispatch(logout());
      };

      useEffect(() => {
    
        if (!userInfo) {
          history.push("/login");
        }
      }, [
        dispatch,
        history,
        userInfo,

    ]);

    return (
        <>
        <div className='dashboard'>
            <Link to='#' className='menu-bars'>
            <MenuIcon onClick={showSidebar}/>
            </Link>


            <div className='logout'><Link to='/login'><h2 onClick={logoutHandler}>Logout</h2></Link></div>
          
        </div>
        <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <CloseIcon/>
                </li>
                {SidebarData.map((item,index)=>{
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span style={{marginLeft:10}}>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        
        </>
    )
}

export default Dashboard
