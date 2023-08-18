import Sidebar from "@/utils/sidebar";
import React from "react";
import Image from "next/image";
import Inventory from "../public/Inventory.png";
import Order from "../public/Order.png";
import Suppliers from "../public/Suppliers.png";
import Store from "../public/Store.png";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="w-[100%] grid grid-cols-[20%_80%] bg-gray-200 h-[100vh] space-x-4">
        <Sidebar />
        <div className="h-[100vh]">
          <div className="bg-white mt-4 rounded-lg w-[97%] h-fit p-5 border border-b-4 border-slate-300">
            <p className="mb-12 font-bold text-4xl">Overview</p>
            <div className="flex w-[100%] justify-around items-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={Order}
                  alt="Sales"
                  width={35}
                  height={30}
                  className="mb-2"
                />
                <p className="text-xl font-semibold text-green-400">Sales</p>
                <p className="text-base font-medium">#446</p>
              </div>
              <div className="w-[2px] h-[85px] bg-slate-400"></div>
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={Store}
                  alt="quantity"
                  width={35}
                  height={30}
                  className="mb-2"
                />
                <p className="text-xl font-semibold text-red-400">Quantity</p>
                <p className="text-base font-medium">6</p>
              </div>
              <div className="w-[2px] h-[85px] bg-slate-400"></div>
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={Order}
                  alt="Orders"
                  width={35}
                  height={30}
                  className="mb-2"
                />
                <p className="text-xl font-semibold text-orange-400">Orders</p>
                <p className="text-base font-medium">46</p>
              </div>
              <div className="w-[2px] h-[85px] bg-slate-400"></div>
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={Suppliers}
                  alt="Suppliers"
                  width={35}
                  height={30}
                  className="mb-2"
                />
                <p className="text-xl font-semibold text-yellow-400">
                  Suppliers
                </p>
                <p className="text-base font-medium">7</p>
              </div>
              <div className="w-[2px] h-[85px] bg-slate-400"></div>
              <div className="flex flex-col justify-center items-center ">
                <Image
                  src={Inventory}
                  alt="Inventory"
                  width={35}
                  height={30}
                  className="mb-2"
                />
                <p className="text-xl font-semibold text-blue-400">
                  Categories
                </p>
                <p className="text-base font-medium">7</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[50%_50%] mt-5 w-[97%] overflow-hidden space-x-4 ">
            <div className="h-[350px] rounded-lg border-b-4 border border-slate-300 bg-white">
              <div className="flex justify-between px-2 py-4 rounded-lg items-center w-[100%] bg-white ">
                <h5 className="font-bold">Low quantity products</h5>
                <p className="text-blue-500">See all</p>
              </div>
              <div className="w-[100%] h-[2px] bg-slate-200 mb-[15px]"></div>
              <div className="w-[100%] flex justify-between items-center p-2">
                <div className="flex justify-between items-center w-[40%]">
                  <Image
                    src={Store}
                    alt="product-name"
                    width={65}
                    height={60}
                  />
                  <div>
                    <p>Product Name</p>
                    <p>Items remaining</p>
                  </div>
                </div>
                <div className="rounded-xl bg-red-100 py-2 px-4">
                  <p className="text-red-500 text-base font-medium">Low</p>
                </div>
              </div>
            </div>
            <div className="h-[350px] rounded-lg border border-b-4 border-slate-300 bg-white">
              <div className="bg-white w-[100%] flex justify-between items-center px-2 py-4 rounded-lg">
                <h5 className="font-bold">Top selling products</h5>
                <p className="text-blue-500">See all</p>
              </div>
              <div className="w-[100%] h-[2px] bg-slate-200 mb-[7px]"></div>
              <div className="grid grid-cols-4 w-[100%] p-2 space-x-3">
                <h6 className="font-medium text-md">Name</h6>
                <h6 className="font-medium  text-md">Price</h6>
                <h6 className="font-medium  text-md">Quantity</h6>
                <h6 className=" font-medium text-md">Category</h6>
              </div>
              <div className="w-[100%] h-[2px] bg-slate-200"></div>
              <h1 className="font-semibold text-center mt-[90px] text-red-500">
                Nothing to show here
              </h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
