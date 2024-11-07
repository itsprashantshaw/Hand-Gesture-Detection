import React from 'react'
import './newaboutus.css'
import { arijit,kushankur,parama,shubham,prashant } from './members'
function Newaboutus() {
    
  return (
    <>  <div className='container-heading'>
            <div className='heading'>Team Members</div>
        </div>
        <div className='card'>
            <div className='box'>
                <img src={kushankur}/>
                <h3>Kushankur Dutta</h3>
                <p>Roll:16971023021</p>
                <span>MCA</span>
            </div>
            <div className='box'>
                <img src={shubham}/>
                <h3>Shubham Das</h3>
                <p>Roll:16971023059</p>
                <span>MCA</span>
            </div>
            <div className='box'>
                <img src={parama}/>
                <h3>Parama Majumdar</h3>
                <p>Roll:16971023024</p>
                <span>MCA</span>
            </div>
            <div className='box'>
                <img src={arijit}/>
                <h3>Arijit Debnath</h3>
                <p>Roll:16971023009</p>
                <span>MCA</span>
            </div>
            <div className='box'>
                <img src={prashant}/>
                <h3>Prashant Shaw</h3>
                <p>Roll:16971023026</p>
                <span>MCA</span>
            </div>
        </div>
    </>
  )
}

export default Newaboutus
