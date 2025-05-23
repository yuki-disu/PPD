import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  All,
  DashBoard,
  FavoriteHouse,
  Filters,
  NavDash,
  Step,
} from "../components";
import SingleHouse from "./SingleHouse";

const Cart = () => {
  return (
    <div className="mt-[150px] align-element">
      <All />
    </div>
  );
};

export default Cart;
