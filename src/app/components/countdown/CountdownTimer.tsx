import useCountdown from "@hooks/useCountdown";
import { DateTime } from "luxon";
import FreeDom from "@components/countdown/Freedom";
import CountdownItem from "./CountdownItem";
import { FireworksHandlers } from "@fireworks-js/react";
import { RefObject } from "react";

const CountdownTimer = ({
  targetDateTime,
  fireworks,
}: {
  targetDateTime: DateTime;
  fireworks: RefObject<FireworksHandlers>;
}) => {
  const duration = useCountdown(() => targetDateTime);

  const isCountdownZero = duration.as("seconds") <= 1;

  if (isCountdownZero) {
    fireworks.current?.start();
    return <FreeDom />;
  }

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
