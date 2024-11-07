import React from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import ProjectInfo from './Components/ProjectInfo/Projectinfo.jsx';
import Newaboutus from './Components/AboutUs/Newaboutus.jsx';
import Footer from './Components/Footer/Footer.jsx';
function App() {
    return (
      <div>
          <Navbar/>
          <ProjectInfo/>
          <Newaboutus/>
          <Footer/>
        </div>
    )
  }

export default App
