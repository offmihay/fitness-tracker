import { useEffect, useState } from "react";

const useCountdown = (initialSeconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(initialSeconds);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (secondsLeft !== null && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev !== null && prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return { secondsLeft, setSecondsLeft };
};

export default useCountdown;
