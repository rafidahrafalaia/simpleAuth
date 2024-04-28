import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import {RequireToken} from './components/Auth.js'
 
import Dashboard from "./components/Dashboard.js";
import Register from './components/Register.js'
 
function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
               
              <Route path='/register' element={<Register />}/>
              <Route path='/' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }>
              </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
   
export default App;