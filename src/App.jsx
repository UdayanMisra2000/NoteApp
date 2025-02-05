import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Body from './Components/Body'
import InitialBody from './Components/InitialBody'

function App() {

  return (
    <>
    <div className="AppView">
      <BrowserRouter>
        <Navbar />
        <div className="body">
          <Routes>
            <Route path="/" element={
              <div className="desktop-only"> <InitialBody /></div>
            } />
            <Route path="/:bodyid/:profileColor" element={<Body />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
