import React, {  } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { fetchUser } from './Auth';
 
function Dashboard() {
    const navigate = useNavigate();
    const user = fetchUser();
    const signOut = () => {
        localStorage.removeItem('Token')
        localStorage.removeItem('User')
        navigate("/login");
    }
    return (
      <div>
        {user && (
          <h2>Welcome, {user}!</h2>
        )}
        <button type = 'button' className="btn btn-success" onClick= {signOut}>Sign Out</button>
      </div>
    );
//   };
}
 
export default Dashboard