import useTimer from "../hooks/useTimer";
import { useEffect } from "react";

interface Props {
  onDone: () => void;
  running: boolean;
  duration: number;
}

// TODO: add onStop(), onPause() and onDone() callbacks
export default function TypingTimer({ onDone, running, duration }: Props) {
  const { currentTime, startTimer, pauseTimer, timerStatus } =
    useTimer(duration);

  useEffect(() => {
    console.log("Timer status changed");
    if (timerStatus === "stopped" && duration - currentTime === 0) {
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
      <p>Timer: {duration - currentTime}</p>
      <p>Timer status: {timerStatus}</p>
    </div>
  );
}
