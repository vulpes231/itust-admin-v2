import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();

  const [isDashboard, setIsDashboard] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [isTransactions, setIsTransactions] = useState(false);
  const [isTrades, setIsTrades] = useState(false);
  const [isAdmins, setIsAdmins] = useState(false);
  const [isPlan, setIsPlan] = useState(false);
  const [isSavings, setIsSavings] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Profile") {
      setIsProfile(false);
    }
    if (iscurrentState !== "Users") {
      setIsUsers(false);
    }
    if (iscurrentState !== "Transactions") {
      setIsTransactions(false);
    }
    if (iscurrentState !== "Trades") {
      setIsTrades(false);
    }
    if (iscurrentState !== "Admins") {
      setIsAdmins(false);
    }
    if (iscurrentState !== "Savings") {
      setIsSavings(false);
    }
    if (iscurrentState !== "Investments") {
      setIsPlan(false);
    }
  }, [
    iscurrentState,
    isDashboard,
    isProfile,
    isTrades,
    isTransactions,
    isUsers,
    isAdmins,
    isSavings,
    isPlan,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "las la-tachometer-alt",
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "users",
      label: "Users",
      icon: "ri-folder-user-line",
      link: "/users",
      stateVariables: isUsers,
      click: function (e) {
        e.preventDefault();
        setIsUsers(!isUsers);
        setIscurrentState("Users");
        updateIconSidebar(e);
      },
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: "ri-token-swap-line",
      link: "/transactions",
      stateVariables: isTransactions,
      click: function (e) {
        e.preventDefault();
        setIsTransactions(!isTransactions);
        setIscurrentState("Transactions");
        updateIconSidebar(e);
      },
    },
    {
      id: "trades",
      label: "Trades",
      icon: "ri-exchange-funds-line",
      link: "/trades",
      stateVariables: isTrades,
      click: function (e) {
        e.preventDefault();
        setIsTrades(!isTrades);
        setIscurrentState("Trades");
        updateIconSidebar(e);
      },
    },
    {
      id: "savings",
      label: "Savings Accounts",
      icon: "ri-hand-coin-line",
      link: "/savings-accounts",
      stateVariables: isSavings,
      click: function (e) {
        e.preventDefault();
        setIsSavings(!isSavings);
        setIscurrentState("Savings");
        updateIconSidebar(e);
      },
    },
    {
      id: "plans",
      label: "Investment Plans",
      icon: "ri-cash-line",
      link: "/investment-plans",
      stateVariables: isPlan,
      click: function (e) {
        e.preventDefault();
        setIsPlan(!isPlan);
        setIscurrentState("Investments");
        updateIconSidebar(e);
      },
    },
    {
      id: "admin",
      label: "Admins",
      icon: "ri-shield-user-line",
      link: "/admins",
      stateVariables: isAdmins,
      click: function (e) {
        e.preventDefault();
        setIsAdmins(!isAdmins);
        setIscurrentState("Admins");
        updateIconSidebar(e);
      },
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
