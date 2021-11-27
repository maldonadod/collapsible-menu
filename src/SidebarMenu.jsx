import React from "react";
import {
  SafetyOutlined,
  UserOutlined,
  IdcardOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "./Menu.css";

export default function SidebarMenu() {
  const [activeItem, setActive] = React.useState();
  const active = (itemName) => itemName === activeItem;
  return (
    <div className="menu-container">
      <ul className="menu">
        <SubMenu
          icon={<SafetyOutlined />}
          label="Roles y Operadores"
          onClick={() => setActive("roles-and-operators")}
          className={
            active("roles-and-operators") ? "menu-item active" : "menu-item"
          }
        />
        <MenuItem
          label="Usuarios"
          icon={<UserOutlined />}
          onClick={() => setActive("users")}
          className={active("users") ? "menu-item active" : "menu-item"}
        />
        <MenuItem
          label="Identity"
          icon={<IdcardOutlined />}
          onClick={() => setActive("identity")}
          className={active("identity") ? "menu-item active" : "menu-item"}
        />
        <SubMenu
          icon={<BankOutlined />}
          label="Core Fintech"
          className={active("core-fintech") ? "menu-item active" : "menu-item"}
          onClick={() => setActive("core-fintech")}
        />
      </ul>
    </div>
  );
}

function SubMenu({ onClick, className, label, icon }) {
  return (
    <li onClick={onClick} className={className}>
      <div className="icon-container">{icon}</div>
      <div className="label-container">
        <span>{label}</span>
      </div>
      <span className="chevron bottom"></span>
    </li>
  );
}

function MenuItem({ onClick, className, label, icon }) {
  return (
    <li onClick={onClick} className={className}>
      <div className="icon-container">{icon}</div>
      <div className="label-container">
        <span>{label}</span>
      </div>
    </li>
  );
}
