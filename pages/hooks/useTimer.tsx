import { useState, useEffect, useRef } from "react";
import { TimerStatus } from "../types/types";

export default function useTimer(duration: number) {
  const [currentTime, setCurrentTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("stopped");
  const lastUpdate = useRef(Date.now());
  const currentTimerStatus = useRef<TimerStatus>("stopped");

  // timerCurrentTime is used to keep track of the current time and is
  // captured by the setInterval() callback. Then it is used to update
  // the react state variable currentTime. It won't work otherwise
  // because the setInterval() handler will create a closure around
  // the currentTime variable and it will always be 0.
  // It is just the number of seconds that have passed.
  let timerCurrentTime = currentTime;

  const startTimer = () => {
    // start the timer
    console.log("starting timer");
    setTimerStatus("running");
    currentTimerStatus.current = "running";
    lastUpdate.current = Date.now();
  };

  const pauseTimer = () => {
    // pause the timer
    setTimerStatus("paused");
    currentTimerStatus.current = "paused";
  };

  const runTimer = () => {
    const timerId = setInterval(() => {
      if (currentTimerStatus.current !== "running") {
        return;
      }
      const now = Date.now();
      const timeSinceLast = now - lastUpdate.current;
      if (timeSinceLast >= 1000) {
        lastUpdate.current = now;
        if (timerCurrentTime < duration) {
          timerCurrentTime += Math.floor(timeSinceLast / 1000);
          setCurrentTime(timerCurrentTime);
        } else {
          setTimerStatus("stopped");
          clearInterval(timerId);
        }
      }
    }, 300);

    return timerId;
  };

  useEffect(() => {
    const timerId = runTimer();
    return () => clearInterval(timerId);
  }, []);

  return { currentTime, startTimer, pauseTimer, timerStatus };
}
