import { Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home/Home';
import CreateActivity from "./components/CreateActivity/CreateActivity";
import Details from "./components/Cards/Details/Details";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path = "/" element={<LandingPage/>}/>
        <Route exact path = "/countries" element={<Home/>}/>
        <Route exact path = "/countries/:id" element={<Details/>}/>
        <Route exact path= "/create" element={<CreateActivity/>}/>
      </Routes>
    </div>
  );
}

export default App;
