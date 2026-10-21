
function FilterBar({
  search,
  setSearch,
  status,
  setStatus
}) {
  return (
    <div className="filter-bar">
      <label htmlFor="search">Tìm kiếm</label>
      <input
        id="search"
        type="text"
        placeholder="Nhập tên sự kiện..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label htmlFor="status">Tình trạng</label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">Tất cả</option>
        <option value="available">Còn chỗ</option>
        <option value="full">Đã đầy</option>
      </select>
    </div>
  );
}

export default FilterBar;
