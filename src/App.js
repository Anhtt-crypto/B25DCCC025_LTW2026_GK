
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";

import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tải dữ liệu khi ứng dụng khởi động
  useEffect(() => {
    const controller = new AbortController();

    // Đọc localStorage trước
    try {
      const saved = localStorage.getItem("gk_events");

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setEvents(parsed);
          setLoading(false);
          return () => controller.abort();
        }
      }
    } catch (err) {
      console.error("Lỗi dữ liệu lưu:", err);
    }

    // Chưa có dữ liệu lưu thì gọi API
    axios
      .get("/data/events.json", {
        signal: controller.signal
      })
      .then((res) => {
        if (!controller.signal.aborted) {
          setEvents(res.data);
        }
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Lưu dữ liệu mỗi khi có thay đổi
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(
        "gk_events",
        JSON.stringify(events)
      );
    }
  }, [events, loading, error]);

  // Thêm sự kiện
  const handleAdd = (newEvent) => {
    setEvents((prev) => {
      const maxId = prev.reduce(
        (max, event) => Math.max(max, event.id),
        0
      );

      return [
        ...prev,
        {
          ...newEvent,
          id: maxId + 1,
          registered: 0
        }
      ];
    });
  };

  // Xóa sự kiện
  const handleDelete = (id) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );
  };

  // Đăng ký sự kiện
  const handleRegister = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id &&
        event.registered < event.capacity
          ? {
              ...event,
              registered: event.registered + 1
            }
          : event
      )
    );
  };

  // Nội dung bên trong Layout
  const pageContent = (content) => {
    if (loading) {
      return <p>Đang tải...</p>;
    }

    if (error) {
      return <p>Không tải được dữ liệu.</p>;
    }

    return content;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={pageContent(<Home events={events} />)}
        />

        <Route
          path="events"
          element={pageContent(
            <EventList
              events={events}
              onDelete={handleDelete}
              onRegister={handleRegister}
            />
          )}
        />

        <Route
          path="events/new"
          element={pageContent(
            <AddEvent onAdd={handleAdd} />
          )}
        />

        <Route
          path="events/:id"
          element={pageContent(
            <EventDetail events={events} />
          )}
        />
      </Route>
    </Routes>
  );
}

export default App;
