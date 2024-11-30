import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Invest from './pages/invest';
import Test from './pages/test';

function IrokoApp() {
  return (
    <div className="IrokoApp">
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/invest/*' element={<Invest />} />
          <Route path='/test' element={<Test />} />
          {/* <Route path='/signup' element={<Signup />} />
          <Route path='/IrokoApp/*' element={<IrokoIrokoApp />} /> */}
      </Routes>
    </div>
  );
}

export default IrokoApp;
