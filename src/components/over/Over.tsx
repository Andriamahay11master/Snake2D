interface OverProps {
    scale: number;
    statut: boolean;
    setIsGameOver: (isGameOver: boolean) => void;
    setIsPaused: (isPaused: boolean) => void;
    setScore: (score: number) => void;
    setSnake: (snake: { x: number; y: number }[]) => void;
    setDirection: (direction: { x: number; y: number }) => void;
    setFruit: (fruit: { x: number; y: number }) => void;
    pickLocation: () => { x: number; y: number };
}

export default function Over({scale, statut,
    setIsGameOver, setIsPaused, setScore, setSnake, setDirection, setFruit, pickLocation} : OverProps) {

    const handleRestart = () => {
        setIsGameOver(false);
        setIsPaused(false);
        setScore(0);
        setSnake([{ x: 0, y: 0 }]);
        setDirection({ x: scale, y: 0 });
        setFruit(pickLocation());
      };

    return (
        <div className={statut ? "over-content show" : "over-content"}>
            <div className="over-top">
                <p>Game Over</p>
            </div>
            <div className="over-bottom">
                <button className="btn btn-icon" onClick={handleRestart}><i className="icon icon-retry"></i><span>Tap to retry</span></button>
            </div>
        </div>
    )
}