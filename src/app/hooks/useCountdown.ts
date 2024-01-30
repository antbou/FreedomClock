import { useEffect, useState } from "react";
import { DateTime, Duration } from "luxon";

const useCountdown = (getTargetDate: () => DateTime): Duration => {
  const [countDown, setCountDown] = useState<Duration>(() =>
    calculateCountdown(getTargetDate())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(calculateCountdown(getTargetDate()));
    }, 1000);

    return () => clearInterval(interval);
  }, [getTargetDate]);

  return countDown;
};

const calculateCountdown = (targetDate: DateTime) => {
  return targetDate.diff(DateTime.now(), [
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ]);
};

export default useCountdown;
