import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = sessionStorage.getItem("token");
  //     // if (!token) {
  //     //   console.error("No token found in session storage.");
  //     //   window.location.href = "/login";
  //     //   return;
  //     // }

  //     const decodedToken = JSON.parse(token);
  //     const token1 = decodedToken.token;
  //     const arrayToken = token1.split(".");
  //     const tokenPayload = JSON.parse(atob(arrayToken[1]));
  //     let userId = tokenPayload.id;

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3333/users/${userId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token1}`,
  //           },
  //         }
  //       );
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <nav className="flex flex-col bg-gray-200 w-64 h-full  border-gray-300">
      <div className="flex gap-4 items-center pl-3 py-7">
        <img src="/Group.png" alt="Image" className="w-7 h-7 " />
        <h1 className="text-2xl font-semibold text-sky-400">Task Manager</h1>
      </div>
      <hr className="border-gray" />
      <div className="p-4">
        <h1 className="text-xl font-bold">MENU</h1>
      </div>
      <ul className="flex flex-col gap-2 flex-grow">
        <SidebarItem
          to="/"
          icon="/layout-grid.svg"
          text="Dashboard"
          active={location.pathname === "/"}
        />
        {userData?.role === "ADMIN" && (
          <SidebarItem
            to="/users"
            icon="/user.svg"
            text="Users"
            active={location.pathname === "/users"}
          />
        )}
        <SidebarItem
          to="/tasks"
          icon="/task_list.svg"
          text="Tasks"
          active={location.pathname === "/tasks"}
        />
        <SidebarItem
          to="/setting"
          icon="/Group.svg"
          text="Settings"
          active={location.pathname === "/setting"}
        />
      </ul>
    </nav>
  );
};

const SidebarItem = ({ to, icon, text, active }) => {
  return (
    <li
      className={`flex items-center gap-2 p-4 ${
        active ? "bg-blue-200 text-blue-800 rounded-lg" : ""
      }`}
    >
      <img src={icon} alt={text} className="w-7 h-7 rounded-full" />
      <Link to={to} className="font-bold text-lg">
        {text}
      </Link>
    </li>
  );
};

export default Sidebar;
