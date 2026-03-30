import './App.css'
import Home from './page/home'
import Upload from './page/upload'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/upload' element={<Upload />} />
        </Routes>
      </div>
    </>
  )
}

export default App
