import React from 'react'
import './projectinfo.css'
import Newaboutus from '../AboutUs/Newaboutus'
function ProjectInfo() {
  const handleDownload = () => {
    const fileId = '1e2k2GWHv-o65ZzYVqJs71dIitsoyedAm';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    // window.open(downloadUrl, "_blank");
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = ' ';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleOpen = () => {
    const fileId = '1e2k2GWHv-o65ZzYVqJs71dIitsoyedAm';
    const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
    window.open(viewUrl, "_blank");
  
  };
  return (
    <>
      <div className='container'>
        <div className='project-info'>
          <h1 className='heading'>Details of Our Project</h1>
          <p className='content'>This project is a fun and interactive Stone-Paper-Scissors game that leverages MediaPipe for real-time hand gesture recognition, React for the user interface, and Tailwind CSS for styling. The primary objective is to create a browser-based game where users can play against the computer using hand gestures.</p>
          <span>Technologies Used: MediaPipe, React, Tailwind CSS, Javascript</span>
          <div className='flex px-2'>
            <button onClick={handleDownload} className="bg-white-300 hover:bg-gradient-to-t from-black to-zinc-600 text-black-800 font-bold  px-2 rounded inline-flex items-center hover:rounded-2xl" >
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              <span>Download</span>
            </button>
            <button onClick={handleOpen} className="bg-white-300 hover:bg-gradient-to-t from-black to-zinc-600 text-black-800 font-bold  px-2 rounded inline-flex items-center hover:rounded-2xl " >
            <svg  viewBox="0 0 1024 1024" className="icon w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"><path fill="#FFFFFF" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
      <Newaboutus />
    </>
  )
}

export default ProjectInfo
