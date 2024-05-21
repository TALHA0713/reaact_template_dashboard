import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Header = ({ heading = "Dashboard" }) => {
  const [userName, setUserName] = useState("Muhammad Talha");
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found in session storage.");
    //   window.location.href = "/login";
    // }

    if (token) {
      let decodedToken;
      try {
        decodedToken = JSON.parse(token);
        let token1 = decodedToken.token;
        const arrayToken = token1.split(".");
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        var name = tokenPayload.name;
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }

      const userName = name;
      setUserName(userName);
    }
  }, []);
  return (
    <nav className=" px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center h-full">
        {/* Left Side */}
        <h1 className="text-xl font-bold">{heading}</h1>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <a href="/notifications">
            <img src="bell.png" alt="Notifications" className="w-8 h-8" />
          </a>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <img src="Profile.png" alt="" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{userName}</p>
              <p>Status-200</p>
            </div>
          </div>

          {/* Icon */}
          <button className="border-none bg-none">
            <FontAwesomeIcon icon={faGreaterThan} size="lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
