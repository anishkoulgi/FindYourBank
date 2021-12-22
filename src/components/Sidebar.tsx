import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";

const routes = [
  {
    name: "All Banks",
    path: "/",
    icon: () => <AiFillHome size={16} />,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: () => <MdOutlineFavorite size={16} />,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div>
      {routes.map((route, i) => (
        <Link key={i} to={route.path}>
          <div
            className={`py-2 px-5 my-2 flex items-center rounded-md ${
              pathname === route.path
                ? "bg-hoverColor text-darkPrimary"
                : "bg-white hover:bg-lightPrimary hover:text-primary transition-all"
            }`}
          >
            {route.icon()}
            <p className="ml-2 text-sm">{route.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
