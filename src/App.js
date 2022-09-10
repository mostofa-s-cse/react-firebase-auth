import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import { signOut } from 'firebase/auth';
import Login from './components/Login/Login';
import RequireAuth from './components/RequireAuth/RequireAuth';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";

function App() {
  const [user] = useAuthState(auth);

    const handleSignOut = () =>{
        signOut(auth);
    }
  return (
    <div className="App">
      <Router>
        <h2 className="mt-5">React Firebase Auth</h2>
        <nav >
        <Link to="/"><button type="button" className="btn btn-primary m-2">Home</button></Link>
        <Link to="/dashboard"><button type="button" className="btn btn-info m-2">Dashboard</button></Link>
        {
           user ?
          <button className="btn btn-outline-warning btn-login" onClick={handleSignOut}>Sign out</button>
          :
          <Link to="/login"><button type="button" className="btn btn-secondary m-2">Login</button></Link>
                         
        }   
        </nav>               
        
      <Routes>
        <Route path='/dashboard' 
          element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>}>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
