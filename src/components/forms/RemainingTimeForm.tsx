import { useEffect, useState } from "react";

// Function to calculate remaining time
function calculateRemainingTime(expires: number) {
  // Get the current time
  const currentTime = new Date().getTime();

  // Calculate the remaining time in milliseconds
  let remainingTime = expires - currentTime;

  // If remaining time is negative, set it to 0
  remainingTime = Math.max(remainingTime, 0);

  // Convert milliseconds to minutes and seconds
  const remainingMinutes = Math.floor(remainingTime / (1000 * 60));
  const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return { minutes: remainingMinutes, seconds: remainingSeconds };
}

// Next.js component
function RemainingTime({ expires }: { expires: number }) {
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(expires)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = calculateRemainingTime(expires);
      setRemainingTime(remainingTime);

      // If expiration time has passed, stop updating remaining time
      if (remainingTime.minutes === 0 && remainingTime.seconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    // Cleanup function to clear interval on unmount or expiration
    return () => clearInterval(intervalId);
  }, [expires]);

  return (
    <>
      {remainingTime.minutes}:{remainingTime.seconds < 10 ? "0" : ""}
      {remainingTime.seconds}
    </>
  );
}

export default RemainingTime;
