import useTimer from "../hooks/useTimer";
import { useEffect } from "react";

interface Props {
  onDone: () => void;
  running: boolean;
}

// TODO: add onStop(), onPause() and onDone() callbacks
export default function TypingTimer({ onDone, running }: Props) {
  const { currentTime, startTimer, pauseTimer, timerStatus } = useTimer(10);

  useEffect(() => {
    if (timerStatus === "stopped") {
      onDone();
    }
  }, [timerStatus]);

  useEffect(() => {
    if (
      running === true &&
      (timerStatus === "paused" || timerStatus === "stopped")
    ) {
      startTimer();
    } else if (
      running === false &&
      timerStatus !== "paused" &&
      timerStatus !== "stopped"
    ) {
      pauseTimer();
    }
  }, [running]);

  return (
    <div>
      <p>Timer: {currentTime}</p>
      <p>Timer status: {timerStatus}</p>
    </div>
  );
}
