import './App.scss'
import './assets/scss/main.scss'
import Snake from './components/snake/Snake'
function App() {

  return (
    <div className="page">
      <div className="gameContainer">
        <Snake/>
      </div>
    </div>
    
  )
}

export default App
