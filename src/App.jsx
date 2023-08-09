import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Authentication/Register';


function App() {


  return (
    <div className="App">
      <Register></Register>
      <BrowserRouter>
      <Routes>
        <Route path="/Authentication" element={<Register/>} />
      </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
