import { useState } from "react"

export default function Snake() {
    
  const [over, setOver] = useState(false)
  setOver(false)
    return (
        <div className="snake">
            <div id="score">Score: 0</div>
            <button id="pauseButton">Pause</button>
            <canvas id="gameCanvas" width="400" height="400"></canvas>
            {over && <div id="gameOver">
                <p>Game Over</p>
                <button id="restartButton">Play Again</button>
            </div>}
    </div>
    )
}