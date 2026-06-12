import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarCheck,
  Wallet,
  Briefcase,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Leave",
      path: "/leave",
      icon: <CalendarCheck size={20} />,
    },
    {
      name: "Salary",
      path: "/salary",
      icon: <Wallet size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <CalendarCheck size={20} />,
    },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-5">
      <h1 className="text-3xl font-bold text-blue-400 mb-10">
        HRMS
      </h1>

      <div className="space-y-3">
        {menus.map((menu, index) => (
          <Link
            key={index}
            to={menu.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 mt-10 w-full rounded-lg transition hover:bg-red-600"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;