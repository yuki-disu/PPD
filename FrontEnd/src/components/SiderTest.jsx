import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import Filters from "./Filters";
import { AllHouses } from "../pages";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-screen">
      {/* Floating Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 left-4 z-40 bg-white  p-3 rounded-md hover:bg-bggreen transition flex items-center gap-2 sm:mt-[40px] "
      >
        <IoFilterSharp className="text-greencol w-[25px] h-[25px]" />
        <span className="text-textblack font-semibold">Filters</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 w-[350px] sm:w-[400px] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-[23px] text-textblack font-semibold">Filters</h1>
          <button onClick={() => setIsOpen(false)}>
            <MdClose className="text-greencol w-[25px] h-[25px]" />
          </button>
        </div>

        {/* Filters Component */}
        <div className="p-4">
          <Filters />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <AllHouses />
      </div>
    </div>
  );
};

export default App;
