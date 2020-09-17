import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import useUser from '../hooks/useUser';
import IconButton from '@material-ui/core/IconButton';

export default function TwitterConponent() {
  const {user, login, logout} = useUser();
  
  function signin() {
    login();
    console.log("login");
    console.log(user);
  }

  function signout() {
    logout();
    console.log("logout");
    console.log(user);
  }

  function iconDisplay(){
    if(user?.photoURL){
      return (
        <div>
          <Link to="/my">
            <IconButton>
              <img src={user.photoURL} alt="TwitterIcon" style={{borderRadius: "16px 16px 16px 16px"}} />
            </IconButton>
          </Link>
          <Button color="inherit" onClick={signout}>Logout</Button>
        </div>
      );
    }
    else{
      return (
        <div>
          <Button color="inherit" onClick={signin}>Login</Button>
        </div>
      )
    }
  }

  return iconDisplay();
}
