import useCountdown from "@hooks/useCountdown";
import { DateTime } from "luxon";
import FreeDom from "@components/countdown/Freedom";

const CountdownTimer = ({ targetDateTime }: { targetDateTime: DateTime }) => {
  const duration = useCountdown(() => targetDateTime);

  const isCountdownZero = duration.as("seconds") <= 1;

  if (isCountdownZero) {
    return <FreeDom />;
  }

  return (
    <p className="text-2xl">
      {duration.days} days {duration.hours} hours {duration.minutes} minutes{" "}
      {duration.seconds} seconds
    </p>
  );
};

export default CountdownTimer;
