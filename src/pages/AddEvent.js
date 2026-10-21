
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEvent({ onAdd }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() ||
        !date || capacity === "") {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const number = Number(capacity);

    if (!Number.isInteger(number) ||
        number < 10 || number > 1000) {
      setError("Sức chứa phải từ 10 đến 1000");
      return;
    }

    onAdd({
      name: name.trim(),
      location: location.trim(),
      date,
      capacity: number,
      registered: 0
    });

    navigate("/events", { replace: true });
  };

  return (
    <div>
      <h1>Thêm sự kiện mới</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Tên sự kiện</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor="location">Địa điểm</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <label htmlFor="date">Ngày diễn ra</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <label htmlFor="capacity">Sức chứa</label>
        <input
          id="capacity"
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
        />

        <button type="submit">Thêm</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AddEvent;
