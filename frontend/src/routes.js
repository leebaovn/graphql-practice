import React, { useState, useContext, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';

import MainNavigation from './components/Navigation/navigation';
import AuthContext, { AuthProvider } from './context/auth-context';
import { storage } from './firebase/firebase';
import AuthPage from './pages/login/Auth';
import Booking from './pages/Booking';
import Event from './pages/Event';
import Homepage from './components/Homepage';
function Routes() {
  const [AuthState, AuthDispatch] = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState({});
  const { token } = AuthState;
  const onFileSelect = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    }
  };
  const handleUploadImage = (e) => {
    e.preventDefault();
    if (imgFile) {
      const uploadTask = storage.ref(`/images/${imgFile.name}`).put(imgFile);
      uploadTask.on(
        'state_changed',
        (snapShot) => {
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref('images')
            .child(imgFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImgUrl(fireBaseUrl);
            });
        }
      );
    }
  };
  return (
    <Router>
      <MainNavigation />
      <main className='main-content'>
        <div>
          <h1>Upload image</h1>
          <form onSubmit={handleUploadImage}>
            <input type='file' name='img' id='img' onChange={onFileSelect} />
            <button type='submit'>Upload</button>
          </form>
        </div>
        <div>
          <img src={imgUrl} alt='Img' />
        </div>
        <Switch>
          {token && <Redirect from='/auth' to='/events' exact />}

          {!token && <Route path='/auth' component={AuthPage} />}

          <Route path='/events' exact component={Event} />

          {token && <Route path='/bookings' exact component={Booking} />}

          <Route path='/' exact component={Homepage} />

          {!token && <Redirect to='/auth' />}
        </Switch>
      </main>
    </Router>
  );
}

export default Routes;
