import { useCallback } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const applyClass = useCallback(
    (classObj: { isActive: boolean; active: string; common: string }) =>
      (classObj.isActive ? classObj.active : "") + " " + classObj.common,
    []
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">MyApp</div>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              applyClass({
                isActive,
                active: "text-blue-600 border-b-2 border-blue-600",
                common: "text-gray-600 hover:text-blue-500 font-medium",
              })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              applyClass({
                isActive,
                active: "text-blue-600 border-b-2 border-blue-600",
                common: "text-gray-600 hover:text-blue-500 font-medium",
              })
            }
          >
            Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
