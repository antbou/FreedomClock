import { useRef } from "react";
import { DateTime } from "luxon";
import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import CountdownTimer from "@components/countdown/CountdownTimer";

import "@/styles/App.css";

function App() {
  const targetDateTime = DateTime.fromISO(
    import.meta.env.VITE_TARGET_DATE_TIME
  );

  const ref = useRef<FireworksHandlers>(null);
  const options = {
    acceleration: 1.02,
    particles: 150,
    mouse: {
      click: true,
      move: false,
      max: 1,
    },
  };

  const isCountdownZero = targetDateTime.diffNow().as("seconds") <= 1;

  return (
    <div className="flex flex-col items-center w-full h-full gap-8 sm:gap-16">
      <div className="shadow-md rounded-lg flex flex-col items-center gap-5 p-5">
        <span className="text-2xl sm:text-3xl font-semibold text-center tracking-widest px-2">
          🪖Counting down to freedom🏝️
        </span>
      </div>
      {targetDateTime.isValid && (
        <CountdownTimer targetDateTime={targetDateTime} fireworks={ref} />
      )}
      <Fireworks
        ref={ref}
        options={options}
        className={isCountdownZero ? "cursor-crosshair" : "hidden"}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 0,
        }}
        autostart={isCountdownZero}
      />
      {!isCountdownZero && (
        <p className="text-xs sm:text-base text-center text-slate-400">
          Error. 6.5, you are still in the army. Please try again at the end of
          the countdown.
        </p>
      )}
    </div>
  );
}

export default App;
