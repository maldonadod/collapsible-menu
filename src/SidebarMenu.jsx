import React from "react";
import {
  SafetyOutlined,
  UserOutlined,
  IdcardOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "./Menu.css";

function useCollapsed() {
  const [collapsed, setCollapsed] = React.useState(true);
  const [isMouseOverMenu, setIsMouseOverMenu] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCollapsed(!isMouseOverMenu);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMouseOverMenu]);

  return {
    collapsed,
    setIsMouseOverMenu,
  };
}

export default function SidebarMenu() {
  const [clickedItems, setClicked] = React.useState([]);
  const [activeItem, setActiveState] = React.useState();
  const { collapsed, setIsMouseOverMenu } = useCollapsed();
  const active = (itemName) => itemName === activeItem;
  const onMouseLeave = () => setIsMouseOverMenu(false);
  const onMouseOver = () => setIsMouseOverMenu(true);
  const handleClickOnMenuItem = (menuItemName) => {
    addClicked(menuItemName);
    !collapsed && setActiveState(menuItemName);
  };
  const addClicked = (menuItemName) => {
    !collapsed &&
      setClicked((clickeds) => {
        if (isClicked(menuItemName)) {
          return clickeds.filter(
            (clickedMenuItem) => clickedMenuItem !== menuItemName
          );
        }
        return [...clickeds, menuItemName];
      });
  };
  const isClicked = (menuItemName) => {
    return clickedItems.includes(menuItemName);
  };
  const getMenuItemClassName = (menuItemName) => {
    return active(menuItemName) ? "menu-item active" : "menu-item";
  };
  React.useEffect(() => {
    if (collapsed) {
      setClicked([]);
    }
  }, [collapsed]);
  return (
    <div
      className="menu-container"
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    >
      <ul className="menu">
        <SubMenu
          isOpen={isClicked("roles-and-operators")}
          icon={<SafetyOutlined />}
          label="Roles y Operadores"
          onClick={() => handleClickOnMenuItem("roles-and-operators")}
          className={getMenuItemClassName("roles-and-operators")}
        />
        <MenuItem
          label="Usuarios"
          icon={<UserOutlined />}
          onClick={() => handleClickOnMenuItem("users")}
          className={getMenuItemClassName("users")}
        />
        <MenuItem
          label="Identity"
          icon={<IdcardOutlined />}
          onClick={() => handleClickOnMenuItem("identity")}
          className={getMenuItemClassName("identity")}
        />
        <SubMenu
          isOpen={isClicked("core-fintech")}
          icon={<BankOutlined />}
          label="Core Fintech"
          className={getMenuItemClassName("core-fintech")}
          onClick={() => handleClickOnMenuItem("core-fintech")}
        />
      </ul>
    </div>
  );
}

function SubMenu({ onClick, className, label, icon, isOpen = false }) {
  return (
    <div className={isOpen ? "sub-menu open" : "sub-menu"}>
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
      <MenuItem
        label="Identity"
        icon={null}
        onClick={() => console.log(`setActive("identity")`)}
        className="menu-item"
      />
      <MenuItem
        label="Identity"
        icon={null}
        onClick={() => console.log(`setActive("identity")`)}
        className="menu-item"
      />
    </div>
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
