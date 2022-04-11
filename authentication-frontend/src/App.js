import { Navbar } from "./Components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { PersonalInfo } from "./Components/PersonalInfo";
import { EditInfo } from "./Components/EditInfo";
import { useState } from "react";
function App() {
  const [auth, setauth] = useState(null);
  const [userdata, setuserdata] = useState({"name":"","email":"","photo":"","bio":"","phone":""});
  const setdata = (user)=>{
    setuserdata(user);
  }
  const fetchdata = ()=>{
    return(userdata);
  }
  let client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  
  return (

    <BrowserRouter>
    <Routes>
        {/* <Route exact path = "/" element={<Navbar />} /> */}
        <Route exact path = "/" element={<><Navbar name={userdata.name} photo={userdata.photo} /><PersonalInfo setdata={setdata} userdata = {userdata} /></>} />
        <Route exact path = "/edit" element={<><Navbar /><EditInfo fetchdata = {fetchdata} /></>} />
        <Route exact path = "/login" element={<Login client_id={client_id} setdata={setdata} setauth={setauth} />} />
        <Route exact path = "/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
