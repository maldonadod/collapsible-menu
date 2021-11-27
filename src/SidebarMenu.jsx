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
        <li
          onClick={() => setActive("roles-and-operators")}
          className={
            active("roles-and-operators") ? "menu-item active" : "menu-item"
          }
        >
          <div className="icon-container">
            <SafetyOutlined />
          </div>
          <div className="label-container">
            <span>Roles y Operadores</span>
          </div>
        </li>
        <li
          onClick={() => setActive("users")}
          className={active("users") ? "menu-item active" : "menu-item"}
        >
          <div className="icon-container">
            <UserOutlined />
          </div>
          <div className="label-container">
            <span>Usuarios</span>
          </div>
        </li>
        <li
          onClick={() => setActive("identity")}
          className={active("identity") ? "menu-item active" : "menu-item"}
        >
          <div className="icon-container">
            <IdcardOutlined />
          </div>
          <div className="label-container">
            <span>Identity</span>
          </div>
        </li>
        <li
          onClick={() => setActive("core-fintech")}
          className={active("core-fintech") ? "menu-item active" : "menu-item"}
        >
          <div className="icon-container">
            <BankOutlined />
          </div>
          <div className="label-container">
            <span>Core Fintech</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
