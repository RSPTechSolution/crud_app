import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import AddEdit from './components/AddEdit';
import View from './components/View';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route  path="/addContact" element={<AddEdit/>} />
        <Route  path="/update/:id" element={<AddEdit/>} />
        <Route  path="/view/:id" element={<View/>} />
        <Route  path="/user/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
