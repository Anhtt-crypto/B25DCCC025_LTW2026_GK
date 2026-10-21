
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

function EventList({ events, onDelete, onRegister }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchName = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const isFull = event.registered >= event.capacity;

    const matchStatus =
      status === "all" ||
      (status === "full" && isFull) ||
      (status === "available" && !isFull);

    return matchName && matchStatus;
  });

  return (
    <div>
      <h1>Danh sách sự kiện</h1>

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <p>Tìm thấy {filteredEvents.length} sự kiện</p>

      {filteredEvents.length === 0 ? (
        <p>Không có dữ liệu.</p>
      ) : (
        <EventTable
          events={filteredEvents}
          onDelete={onDelete}
          onRegister={onRegister}
        />
      )}
    </div>
  );
}

export default EventList;
