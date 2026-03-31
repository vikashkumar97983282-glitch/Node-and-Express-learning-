import './App.css'
import Home from './page/home'
import Upload from './page/upload'
import Update from './page/update'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </div>
    </>
  )
}

export default App
