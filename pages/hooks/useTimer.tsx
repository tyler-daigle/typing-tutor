import { useState, useCallback, useEffect } from "react";

type TimerStatus = "running" | "paused" | "stopped";

export default function useTimer(duration: number) {
  const [currentTime, setCurrentTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("stopped");

  // timerCurrentTime is used to keep track of the current time and is
  // captured by the setInterval() callback. Then it is used to update
  // the react state variable currentTime. It won't work otherwise
  // because the setInterval() handler will create a closure around
  // the currentTime variable and it will always be 0.

  let timerCurrentTime = currentTime;

  const startTimer = useCallback(() => {
    // start the timer
  }, []);

  const pauseTimer = useCallback(() => {
    // pause the timer
  }, []);

  const runTimer = () => {
    let lastUpdate = Date.now();

    const timerId = setInterval(() => {
      console.log("tick");
      const now = Date.now();
      const timeSinceLast = now - lastUpdate;
      if (timeSinceLast >= 1000) {
        lastUpdate = now;
        if (timerCurrentTime < duration) {
          console.log(duration, timerCurrentTime);
          timerCurrentTime += Math.floor(timeSinceLast / 1000);
          // setCurrentTime((time) => Math.floor(time + timeSinceLast / 1000));
          setCurrentTime(timerCurrentTime);
        } else {
          console.log("Clearing timer");
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
