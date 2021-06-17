import React, {useEffect}  from 'react';
import Routes from './Routes/Routes';
import Footer from './components/Footer';
import Alert from './components/shared/Alert'

import './App.css'
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Alert />
      <Routes />
      <Footer />
    </div>
  );
}
export default App;