import React from "react";
import {
  SafetyOutlined,
  UserOutlined,
  IdcardOutlined,
  BankOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import "./Menu.css";

const menuItems = [
  {
    name: "roles-and-operators",
    label: "Roles y Operadores",
    icon: <SafetyOutlined />,
    subitems: [
      {
        name: "roles",
        label: "Roles",
      },
      {
        name: "operators",
        label: "Operadores",
      },
    ],
  },
  {
    name: "users",
    label: "Usuarios",
    icon: <UserOutlined />,
  },
  {
    name: "identity",
    label: "Identity",
    icon: <IdcardOutlined />,
  },
  {
    name: "core-fintech",
    label: "Core Fintech",
    icon: <BankOutlined />,
    subitems: [
      {
        name: "accounts",
        label: "Cuentas",
      },
      {
        name: "transactions",
        label: "Transacciones",
      },
    ],
  },
  {
    name: "cards",
    label: "Tarjetas",
    icon: <CreditCardOutlined />,
    subitems: [
      {
        name: "cards-issued",
        label: "Tarjetas emitidas",
      },
      {
        name: "delivery",
        label: "Delivery",
      },
      {
        name: "card-batch",
        label: "Envio de lotes",
      },
      {
        name: "transactions",
        label: "Transacciones",
      },
    ],
  },
];

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
        {menuItems.map((menuItem) => {
          if (menuItem.subitems && menuItem.subitems.length > 0) {
            return (
              <SubMenu
                isOpen={isClicked(menuItem.name)}
                icon={menuItem.icon}
                label={menuItem.label}
                subitems={menuItem.subitems}
                onClick={() => handleClickOnMenuItem(menuItem.name)}
                className={getMenuItemClassName(menuItem.name)}
              />
            );
          } else {
            return (
              <MenuItem
                label={menuItem.label}
                icon={menuItem.icon}
                onClick={() => handleClickOnMenuItem(menuItem.name)}
                className={getMenuItemClassName(menuItem.name)}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

function SubMenu({
  onClick,
  className,
  label,
  icon,
  isOpen = false,
  subitems = [],
}) {
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
      {subitems.map((subitem) => {
        return (
          <MenuItem
            label={subitem.label}
            icon={null}
            onClick={() => console.log(`setActive("identity")`)}
            className="menu-item"
          />
        );
      })}
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
