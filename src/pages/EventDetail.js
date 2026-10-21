
import { useParams, useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";

function EventDetail({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find(
    (item) => item.id === Number(id)
  );

  if (!event) {
    return <h2>Không tìm thấy sự kiện.</h2>;
  }

  return (
    <div>
      <h1>Chi tiết sự kiện</h1>

      <p>Sự kiện: {event.name}</p>
      <p>Địa điểm: {event.location}</p>
      <p>Ngày: {event.date}</p>
      <p>Số chỗ: {event.registered}/{event.capacity}</p>

      <h3>Đồng hồ đếm ngược</h3>
      <Countdown date={event.date} />

      <button onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
}

export default EventDetail;
