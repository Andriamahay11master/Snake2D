import { useState } from "react"
import './snake.scss'
export default function Snake() {
    
  const [over, setOver] = useState(false)
  setOver(false)
    return (
        <div className="snake">
            <div className="score">Score: 0</div>
            <button className="pauseButton">Pause</button>
            <canvas className="gameCanvas" width="400" height="400"></canvas>
            {over && <div className="gameOver">
                <p>Game Over</p>
                <button className="restartButton">Play Again</button>
            </div>}
    </div>
    )
}