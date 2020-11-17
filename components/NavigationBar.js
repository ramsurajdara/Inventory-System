import React, {useContext} from 'react';
import "bootstrap/js/src/collapse.js";
import { Link } from 'react-router-dom';
import {UserContext} from './UserContext';

export default function NavigationBar() {

    const [auth, setAuth] = useContext(UserContext)

    function LoginMenu() {
        return (
        <li class="nav-item">
            <Link to = "/login" class="nav-link">Login</Link>
        </li>
        )
    }

    function Register() {
        return (
            <li class="nav-item">
                <Link to = "/register" class="nav-link">Register</Link>
            </li>
        )
    }

    function ProfileMenu() {
        return (
        <li class="nav-item">
            <Link to = "/profile" class="nav-link">Profile</Link>
        </li>
        )
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
            <img src = {"logo192.png"} alt = "logo" height = "50px" width = "50px"/>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <Link to="/" class = "nav-link">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link to = "/products" class="nav-link">View</Link>
                    </li>
                    {/* <li class="nav-item">
                        <Link to = "/top-products" class="nav-link">Top Views</Link>
                    </li> */}
                    <li class="nav-item">
                        <Link to = "/add-product" class="nav-link">Add</Link>
                    </li>
                    <li class="nav-item">
                        <Link to = "/modify" class="nav-link">Delete</Link>
                    </li> 
                    {auth.flag?
                        <ProfileMenu/>: (<LoginMenu />)
                    }
                    {auth.flag? (null): <Register/>}
                </ul>        
            </div>
        </nav>        
    )
}
