import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import ProjectInfo from './Components/ProjectInfo/Projectinfo.jsx'
import PlayGame from './Components/PlayGame.jsx'
import Webcam from './Components/Webcam/Webcam.jsx'


const router= createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout/>}>
            <Route path='' element={<ProjectInfo/>}/>
            <Route path='play/' element={<Webcam/>}/>
        </Route>
        <Route path='*' element={<div>Not Found</div>}/>
      </>
    )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
