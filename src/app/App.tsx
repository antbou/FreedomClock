import "@/styles/App.css";
import CountdownTimer from "@components/countdown/CountdownTimer";
import { DateTime } from "luxon";

const targetDateTime = DateTime.fromISO(import.meta.env.VITE_TARGET_DATE_TIME);

function App() {
  return (
    <div className="flex flex-col items-center w-full h-full gap-8 sm:gap-16">
      <span className="text-2xl sm:text-5xl font-semibold text-center tracking-widest px-2">
        Counting down to freedom !
      </span>
      {targetDateTime.isValid && (
        <CountdownTimer targetDateTime={targetDateTime} />
      )}
    </div>
  );
}

export default App;
