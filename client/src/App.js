import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import AddEdit from './components/AddEdit';
import View from './components/View';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route  path="/addContact" element={<AddEdit/>} />
        <Route  path="/update/:id" element={<AddEdit/>} />
        <Route  path="/view/:id" element={<View/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
