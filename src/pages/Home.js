
import { Link } from "react-router-dom";

function Home({ events }) {
  const total = events.length;

  const totalRegistered = events.reduce(
    (sum, event) => sum + event.registered,
    0
  );

  const totalFull = events.filter(
    (event) => event.registered >= event.capacity
  ).length;

  const featuredEvents = events.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero">
        <div>
          <span className="eyebrow">
            CLUB EVENT MANAGEMENT
          </span>

          <h1>Sự kiện CLB</h1>

          <p>
            Chào mừng đến với hệ thống quản lý sự kiện
            câu lạc bộ lập trình. Khám phá, đăng ký
            và theo dõi các hoạt động thú vị.
          </p>

          <Link to="/events" className="hero-btn">
            Khám phá sự kiện →
          </Link>
        </div>

        <div className="hero-symbol" aria-hidden="true">
          ✦
        </div>
      </section>

      <div className="section-heading">
        <h2>Tổng quan hoạt động</h2>
        <p>Thống kê được cập nhật theo dữ liệu hiện tại</p>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <p>Tổng số sự kiện: {total}</p>
          <span>Các sự kiện trong hệ thống</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <p>Tổng số lượt đăng ký: {totalRegistered}</p>
          <span>Lượt tham gia hoạt động</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <p>Số sự kiện đã đầy: {totalFull}</p>
          <span>Sự kiện đã hết chỗ</span>
        </div>
      </section>

      <div className="section-heading">
        <h2>Sự kiện nổi bật</h2>
        <p>Một số hoạt động của câu lạc bộ</p>
      </div>

      <div className="featured-grid">
        {featuredEvents.map((event) => {
          const percentage = Math.min(
            100,
            (event.registered / event.capacity) * 100
          );

          const full =
            event.registered >= event.capacity;

          return (
            <div className="featured-card" key={event.id}>
              <div className="featured-top">
                <span>CLB EVENT</span>
                <span className={full ? "status-full" : "status-open"}>
                  {full ? "Đã đầy" : "Còn chỗ"}
                </span>
              </div>

              <h3>{event.name}</h3>

              <p>📍 {event.location}</p>
              <p>📅 {event.date}</p>

              <div className="progress-info">
                <span>Số chỗ</span>
                <strong>
                  {event.registered}/{event.capacity}
                </strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <Link
                to={`/events/${event.id}`}
                className="detail-link"
              >
                Xem chi tiết →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
