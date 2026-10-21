
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Trang chủ
      </NavLink>

      <NavLink to="/events" end>
        Danh sách
      </NavLink>

      <NavLink to="/events/new">
        Thêm mới
      </NavLink>
    </nav>
  );
}

export default NavBar;
