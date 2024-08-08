import Game from "../../components/game/Game";

export function BeginGame() {
    return (
        <div className="page">
            <div className="gameContainer">
                <Game/>
            </div>
        </div>
    )
}