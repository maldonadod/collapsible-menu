import React from "react";
import {
  SafetyOutlined,
  UserOutlined,
  IdcardOutlined,
  BankOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import "./Menu.css";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";

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
        name: "cards-transactions",
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

const activeItemsEntries = {
  roles: ["roles-and-operators", "roles"],
  operators: ["roles-and-operators", "operators"],

  accounts: ["core-fintech", "accounts"],
  transactions: ["core-fintech", "transactions"],

  accounts: ["core-fintech", "accounts"],
  transactions: ["core-fintech", "transactions"],

  "cards-issued": ["cards", "cards-issued"],
  delivery: ["cards", "delivery"],
  "card-batch": ["cards", "card-batch"],
  "cards-transactions": ["cards", "transactions"],
};

function deduceIfItemNameIsActiveFromSelectedItem(activeItem, itemName) {
  return activeItemsEntries[activeItem]
    ? activeItemsEntries[activeItem].includes(itemName)
    : activeItem === itemName;
}

export default function SidebarMenu() {
  const [clickedItems, setClicked] = React.useState([]);
  const [activeItem, setActiveState] = React.useState();
  const { collapsed, setIsMouseOverMenu } = useCollapsed();
  const active = (itemName) => {
    return deduceIfItemNameIsActiveFromSelectedItem(activeItem, itemName);
  };
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
                isOpen={!collapsed && isClicked(menuItem.name)}
                icon={menuItem.icon}
                label={menuItem.label}
                subitems={menuItem.subitems.map((subitem) => {
                  return (
                    <MenuItem
                      label={subitem.label}
                      icon={null}
                      onClick={() => handleClickOnMenuItem(subitem.name)}
                      className={getMenuItemClassName(subitem.name)}
                    />
                  );
                })}
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
