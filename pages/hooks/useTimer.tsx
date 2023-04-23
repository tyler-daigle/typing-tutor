import { useState, useMemo, useEffect } from "react";

type TimerStatus = "running" | "paused" | "stopped";

// Need the global variables so that the setInterval() callback can
// access them.

let currentTimerStatus: TimerStatus = "stopped";
let lastUpdate = Date.now();

export default function useTimer(duration: number) {
  const [currentTime, setCurrentTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("stopped");

  // timerCurrentTime is used to keep track of the current time and is
  // captured by the setInterval() callback. Then it is used to update
  // the react state variable currentTime. It won't work otherwise
  // because the setInterval() handler will create a closure around
  // the currentTime variable and it will always be 0.

  let timerCurrentTime = currentTime;

  const startTimer = () => {
    // start the timer
    console.log("starting timer");
    setTimerStatus("running");
    currentTimerStatus = "running";
    lastUpdate = Date.now();
  };

  const pauseTimer = () => {
    // pause the timer
    setTimerStatus("paused");
    currentTimerStatus = "paused";
  };

  const runTimer = () => {
    const timerId = setInterval(() => {
      if (currentTimerStatus !== "running") {
        return;
      }
      const now = Date.now();
      const timeSinceLast = now - lastUpdate;
      if (timeSinceLast >= 1000) {
        lastUpdate = now;
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
