function SubMenu({
  onClick,
  className,
  label,
  icon,
  isOpen = false,
  subitems = [],
}) {
  return (
    <div className={isOpen ? `sub-menu size-${subitems.length}` : "sub-menu"}>
      <li
        onClick={onClick}
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
        }}
      >
        <div style={{ display: "flex" }}>
          <div className="icon-container">{icon}</div>
          <div className="label-container">
            <span>{label}</span>
          </div>
          <span className="chevron bottom"></span>
        </div>
      </li>
      {subitems}
    </div>
  );
}

export default SubMenu;
