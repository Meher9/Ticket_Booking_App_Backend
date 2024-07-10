import logo from './logo.svg';
import './App.css';
import LoginPage from './login';
import SignupPage from './signup';
import Dashboard from './dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
import MoviesComponent from './movies';
import TheatersComponent from './theaters';
import BookTicketComponent from './book';
import Payment from './payment';
import ConfirmationComponent from './confirmation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/dashboard' element={<><Header/> <Dashboard/></>}/>
          <Route path='/movie/:moviename' element={<><Header/><MoviesComponent/></>}/>
          <Route path='/theaters/:theatername' element={<><Header/><TheatersComponent/></>}/>
          <Route path='/:theatername/:movie/:date' element={<><Header/><BookTicketComponent/></>}/>
          <Route path='/payment' element={<><Header/><Payment/></>}/>
          <Route path='/confirmation' element={<><Header/><ConfirmationComponent/></>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
