
import { Link } from "react-router-dom";

function EventRow({ event, onDelete, onRegister }) {
  const isFull = event.registered >= event.capacity;

  return (
    <tr className={isFull ? "full-row" : ""}>
      <td>
        <Link to={`/events/${event.id}`}>
          {event.name}
        </Link>
      </td>

      <td>{event.location}</td>
      <td>{event.date}</td>

      <td>
        {event.registered}/{event.capacity}
      </td>

      <td>
        <button
          onClick={() => onRegister(event.id)}
          disabled={isFull}
        >
          Đăng ký
        </button>

        <button onClick={() => onDelete(event.id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default EventRow;
