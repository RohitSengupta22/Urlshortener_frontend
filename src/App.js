import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Components/Auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Components/Homepage';
import Urls from './Components/Urls';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/home' element={<Homepage />} />
      <Route path='/Url' element={<Urls />} />
     

    </Routes>
    </BrowserRouter>
  );
}

export default App;