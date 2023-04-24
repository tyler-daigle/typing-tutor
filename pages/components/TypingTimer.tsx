import useTimer from "../hooks/useTimer";

export default function TypingTimer() {
  const { currentTime, startTimer, pauseTimer, timerStatus } = useTimer(10);

  return (
    <div>
      <p>Timer: {currentTime}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <p>Timer status: {timerStatus}</p>
    </div>
  );
}
