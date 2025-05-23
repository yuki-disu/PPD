import React from "react";
import SingleHouse from "./SingleHouse";
import { EditProf, General, ResetPass } from "../components";

const Checkout = () => {
  return (
    <div className="m-[80px]">
      <EditProf />
      <ResetPass />
    </div>
  );
};

export default Checkout;
