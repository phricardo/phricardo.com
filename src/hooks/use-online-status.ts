import { useEffect, useState } from "react";

const SAO_PAULO_TZ = "America/Sao_Paulo";
const ONLINE_START_HOUR = 8; // inclusive
const ONLINE_END_HOUR = 22; // exclusive

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const now = new Date();
      const saoPauloNow = new Date(
        now.toLocaleString("en-US", { timeZone: SAO_PAULO_TZ })
      );

      const day = saoPauloNow.getDay(); // 0 = Sunday
      const hour = saoPauloNow.getHours();

      const isWeekday = day >= 1 && day <= 5;
      const inWorkingWindow =
        hour >= ONLINE_START_HOUR && hour < ONLINE_END_HOUR;

      setIsOnline(isWeekday && inWorkingWindow);
    };

    evaluate();
    const id = window.setInterval(evaluate, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return isOnline;
}
