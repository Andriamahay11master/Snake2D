
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss'
import './assets/scss/main.scss'
import { BeginGame } from './pages/game/BeginGame';
import Home from './pages/home/Home';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/game' element={<BeginGame />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </Router>
    
  )
}

export default App
