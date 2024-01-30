import "@/styles/App.css";
import CountdownTimer from "@components/countdown/CountdownTimer";
import { DateTime } from "luxon";

const targetDateTime = DateTime.fromISO(import.meta.env.VITE_TARGET_DATE_TIME);

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl">Counting down to freedom</h1>
      {targetDateTime.isValid && (
        <CountdownTimer targetDateTime={targetDateTime} />
      )}
    </div>
  );
}

export default App;
