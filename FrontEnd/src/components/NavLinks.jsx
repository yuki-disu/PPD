import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { id: 4, url: "allhouses", text: "Houses" },
  { id: 2, url: "cart", text: "List Your Property" },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li
            className="block py-2 px-3 text-textblack  hover:text-greencol font-semibold rounded-[15px] "
            key={id}
          >
            <NavLink to={url}> {text}</NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
