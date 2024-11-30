import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/signup';
import Login from './pages/login';
import IrokoApp from './irokoApp';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/app/*' element={<IrokoApp />} />
      </Routes>
    </div>
  );
}

export default App;
