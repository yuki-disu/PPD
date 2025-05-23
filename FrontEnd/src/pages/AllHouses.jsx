import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import Filters from "../components/Filters";
import { FaHeart } from "react-icons/fa";
import { IoLocationSharp, IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { TbArrowsDiagonal2 } from "react-icons/tb";
import { FaKitchenSet } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { fetchFilteredHouses } from "../features/houses/houseSlice";
import { Link } from "react-router-dom";
const AllHouses = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const { houses, loading } = useSelector((state) => state.houses);
  console.log(houses);

  useEffect(() => {
    dispatch(fetchFilteredHouses());
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(houses.length)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse border rounded-lg p-4 shadow-md"
          >
            {/* Image Skeleton */}
            <div className="bg-gray-300 h-[230px] w-full rounded-t-[10px]" />

            {/* Text Skeletons for location and price */}
            <div className="mt-4 bg-gray-300 h-4 w-3/4 rounded" />
            <div className="mt-2 bg-gray-300 h-4 w-1/2 rounded" />
            <div className="mt-2 bg-gray-300 h-4 w-2/3 rounded" />

            {/* Room, bathroom, kitchen, area skeletons */}
            <div className="mt-4 flex gap-4">
              <div className="bg-gray-300 h-6 w-[40%] rounded" />
              <div className="bg-gray-300 h-6 w-[40%] rounded" />
              <div className="bg-gray-300 h-6 w-[40%] rounded" />
              <div className="bg-gray-300 h-6 w-[40%] rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-[100px] px-4">
      {/* Button to toggle filters */}
      <div>
        {showFilters === false && (
          <div
            onClick={() => {
              setShowFilters(true);
            }}
            className="w-[150px] flex flex-row items-center justify-center gap-[10px] text-greencol mb-[20px] cursor-pointer transition-colors hover:bg-bggreen2 py-[5px] rounded-[10px]"
          >
            <p>show filters</p>
            <IoIosArrowDroprightCircle className="" />
          </div>
        )}
        {showFilters === true && (
          <div
            onClick={() => {
              setShowFilters(false);
            }}
            className="w-[150px] flex flex-row items-center justify-center gap-[10px] text-greencol mb-[20px] cursor-pointer transition-colors hover:bg-bggreen2 py-[5px] rounded-[10px]"
          >
            <p>hide filters</p>
            <IoIosArrowDropleftCircle className="w-[30px]" />
          </div>
        )}
      </div>

      {/* Container */}
      <div className="flex transition-all duration-500 ease-in-out">
        {/* Filters Section */}
        <div
          className={`transition-all align-element duration-500 ease-in-out overflow-hidden ${
            showFilters ? " w-[370px] mr-6 " : "w-0"
          }`}
        >
          {showFilters && <Filters />}
        </div>

        {/* Houses Grid */}
        <div
          className={`flex-1 grid 
    grid-cols-1
    sm:${showFilters ? "grid-cols-3" : "grid-cols-1"}
    lg:${showFilters ? "grid-cols-3" : "grid-cols-4"}
    gap-6 transition-all duration-500`}
        >
          {houses.map((house) => (
            <Link to={`/allhouses/${house.id}`}>
              <div
                key={house.id}
                className="cursor-pointer w-full border-greencol h-[420px] border-[1px] rounded-[10px] pb-[10px] flex flex-col gap-[15px] items-start shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-4"
              >
                <div className="relative w-full">
                  <img
                    src={house.imageCover}
                    className="w-full h-[230px] object-cover rounded-t-[10px]"
                  />
                  <button
                    className="absolute top-3 right-3 text-white text-xl"
                    onClick={() => setIsFavorite(!isFavorite)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <FaHeart
                      className={
                        isFavorite ? "text-red-500" : "text-white opacity-60"
                      }
                    />
                  </button>
                  {isHovered && (
                    <div className="absolute top-2 right-10 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md">
                      {isFavorite
                        ? "remove from favorites"
                        : "add to favorites"}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start ml-[10px] gap-[5px]">
                  <h1 className="text-[20px] font-bold text-textblack"></h1>
                  <div className="grid grid-cols-11">
                    <IoLocationSharp className="col-span-1 w-[25px] h-[30px] font-semibold text-greencol" />
                    <h1 className="col-span-10 text-[18px] font-bold text-textblack">
                      {house.location}
                    </h1>
                  </div>
                  <div className="mt-[10px] flex flex-col gap-[10px] items-start ml-[8px]">
                    {!house.forRent ? (
                      <p className="text-greencol font-medium text-[15px] flex items-center">
                        For sale :
                        <span className="font-normal text-[18px] text-textblack ml-1">
                          {house.price} DA
                        </span>
                      </p>
                    ) : (
                      <p className="text-greencol font-medium text-[15px] flex items-center">
                        For rent :
                        <span className="font-normal text-[18px] text-textblack ml-1">
                          {house.price} DA
                        </span>
                        <span className="text-textblack font-light text-[16px] ml-1">
                          /Month
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="mt-[5px] flex flex-row items-center justify-between w-[290px] mx-[25px] gap-[20px]">
                    <div className="px-[4px] py-[2px] text-textgray rounded-[8px] flex flex-row gap-[8px] items-center">
                      <div className="bg-bggray rounded-full p-[3px]">
                        <IoBed className="w-[18px] h-[18px]" />
                      </div>
                      <p className="text-[13px] font-semibold">
                        {house.numOfRooms}
                      </p>
                    </div>

                    <div className="px-[4px] py-[2px] text-textgray rounded-[8px] flex flex-row gap-[8px] items-center">
                      <div className="bg-bggray rounded-full p-[3px]">
                        <FaBath className="w-[16px] h-[16px]" />
                      </div>
                      <p className="text-[13px] font-semibold">
                        {house.numOfBathroom}
                      </p>
                    </div>

                    <div className="px-[4px] py-[2px] text-textgray rounded-[8px] flex flex-row gap-[8px] items-center">
                      <div className="bg-bggray rounded-full p-[3px]">
                        <FaKitchenSet className="w-[18px] h-[18px]" />
                      </div>
                      <p className="text-[13px] font-semibold">
                        {house.numOfKitchen}
                      </p>
                    </div>

                    <div className="px-[4px] py-[2px] text-textgray rounded-[8px] flex flex-row gap-[8px] items-center">
                      <div className="bg-bggray rounded-full p-[3px]">
                        <TbArrowsDiagonal2 className="w-[17px] h-[17px]" />
                      </div>
                      <p className="text-[13px] font-semibold">
                        {house.area} m²
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllHouses;
