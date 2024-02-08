import { Duration } from "luxon";
import CountdownItem from "./CountdownItem";

interface CountdownTimerProps {
  duration: Duration;
}

const CountdownTimer = ({ duration }: CountdownTimerProps) => {
  return (
    <div className="flex justify-center gap-3 sm:gap-8">
      <CountdownItem value={duration?.days} unit="day" />
      <CountdownItem value={duration?.hours} unit="hour" />
      <CountdownItem value={duration?.minutes} unit="minute" />
      <CountdownItem value={duration?.seconds} unit="second" />
    </div>
  );
};

export default CountdownTimer;
