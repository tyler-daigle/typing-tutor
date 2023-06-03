import style from "../styles/SpeedMeter.module.css";

export default function SpeedMeter({ wpm }: { wpm: number }) {
  const maxWpm = 120;
  const percentageVisible = Math.floor((wpm / maxWpm) * 100);

  const speedMessage = [
    { startRange: 40, endRange: 49, message: "Average" },
    { startRange: 50, endRange: 59, message: "Above Average" },
    { startRange: 60, endRange: 69, message: "Fast" },
    { startRange: 70, endRange: 100, message: "High Speed" },
    { startRange: 101, endRange: 300, message: "On Fire!" },
  ];

  const currSpeedMessage = (() => {
    if (wpm === 0) {
      return "";
    }
    if (wpm <= 39) {
      return "Keep Typing...";
    }
    for (let i = 0; i < speedMessage.length; i++) {
      if (
        wpm >= speedMessage[i].startRange &&
        wpm <= speedMessage[i].endRange
      ) {
        return speedMessage[i].message;
      }
    }
    return "Way Too Fast";
  })();

  return (
    <div>
      <div className={style.speedMeterContainer}>
        <div className={style.speedMeter}>
          <div
            style={{
              left: `${percentageVisible}%`,
            }}
            className={style.overlay}
          ></div>
        </div>
      </div>
      {/* <span className={style.speedMeterMessage}>{currSpeedMessage}</span> */}
    </div>
  );
}
