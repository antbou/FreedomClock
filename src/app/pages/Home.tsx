import { useEffect, useRef } from "react";
import { DateTime } from "luxon";
import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "@components/countdown/CountdownTimer";
import useKeyDown from "@hooks/useKeyDown";
import "@/styles/App.css";
import useCountdown from "@hooks/useCountdown";
import FreeDom from "@components/countdown/Freedom";

const Home = () => {
  const navigate = useNavigate();
  const ref = useRef<FireworksHandlers>(null);

  const targetDateTime = DateTime.fromISO(
    import.meta.env.VITE_TARGET_DATE_TIME
  );

  const options = {
    acceleration: 1.02,
    particles: 150,
    mouse: {
      click: true,
      move: false,
      max: 1,
    },
  };

  const duration = useCountdown(() => targetDateTime);

  const isCountdownZero = duration.as("seconds") <= 1;

  useEffect(() => {
    if (isCountdownZero) {
      ref.current?.start();
    }
  }, [isCountdownZero]);

  useKeyDown(() => {
    navigate("/game");
  }, ["Space"]);

  return (
    <div className="flex flex-col items-center w-full h-full gap-8 sm:gap-16">
      <div className="shadow-md rounded-lg flex flex-col items-center gap-5 p-5">
        <span className="text-2xl sm:text-3xl font-semibold text-center tracking-widest px-2">
          🪖Counting down to freedom🏝️
        </span>
      </div>
      {targetDateTime.isValid && !isCountdownZero ? (
        <CountdownTimer duration={duration} />
      ) : (
        <FreeDom />
      )}
      {!isCountdownZero && (
        <p className="text-xs sm:text-base text-center text-slate-400">
          Error. 6.5, you are still in the army. Please try again at the end of
          the countdown.
        </p>
      )}
      <p className="text-xs sm:text-base text-center text-slate-500">
        Press <kbd>space</kbd> to pass the time 👀
      </p>{" "}
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
    </div>
  );
};

export default Home;
