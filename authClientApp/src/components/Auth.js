import React, { } from "react";
  
import {
    Navigate ,
    useLocation
  } from "react-router-dom";
export const setToken = (token) =>{
      // set token in localStorage
    localStorage.setItem('Token', token)
}
export const setUser = (user) =>{
    // set token in localStorage
    localStorage.setItem('User', user)
}
export const fetchToken = () =>{
    // fetch the token
    return localStorage.getItem('Token')
}
export const fetchUser = () =>{
    // fetch the token
    return localStorage.getItem('User')
}
export function RequireToken({children}) {
      
    let auth = fetchToken()
    let location = useLocation();
    
    if (!auth) {
        
      return <Navigate to="/login" state={{ from: location }} />;
    }
    
    return children;
}