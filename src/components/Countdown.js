
import { useEffect, useState } from "react";

function Countdown({ date }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const target = new Date(`${date}T00:00:00`);

    const updateCountdown = () => {
      const difference = target.getTime() - Date.now();
      setRemaining(Math.max(0, difference));
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (remaining === 0) {
    return <p>Sự kiện đã diễn ra.</p>;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <p>
      Còn {days} ngày {hours} giờ {minutes} phút {seconds} giây
    </p>
  );
}

export default Countdown;
