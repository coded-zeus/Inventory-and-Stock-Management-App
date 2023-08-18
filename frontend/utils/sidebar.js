import Image from "next/image";
import Logo from "../public/Logo.svg";
import Home from "../public/Home.png";
import Inventory from "../public/Inventory.png";
import Order from "../public/Order.png";
import Suppliers from "../public/Suppliers.png";
import Store from "../public/Store.png";
import Settings from "../public/Settings.png";
import Logout from "../public/Logout.png";
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Link from "next/link";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleClick = (activeLink) => {
    setActiveLink(activeLink);
    localStorage.setItem("activeLink", activeLink);
  };
  useEffect(() => {
    const storedLink = localStorage.getItem("activeLink");
    if (storedLink) {
      setActiveLink(storedLink);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="p-6 flex flex-col justify-center bg-white h-100vh rounded-br-lg">
        <Logo className="mb-9" />
        <Link href="/dashboard">
          <div
            className="flex mb-3 hover:bg-slate-300 py-3 rounded-xl w-fit pr-9 pl-2 transition-all"
            onClick={() => handleClick("dashboard")}
          >
            <Image
              src={Home}
              width={25}
              height={20}
              alt="home"
              className="mr-3"
            />
            <p
              className="font-semibold text-blue-600"
              style={{ color: activeLink === "dashboard" ? "blue" : "black" }}
            >
              Dashboard
            </p>
          </div>
        </Link>
        <Link href="/inventory">
          {" "}
          <div
            className="flex mb-3 hover:bg-slate-300 py-3 rounded-xl w-fit pr-9 pl-2"
            onClick={() => handleClick("inventory")}
          >
            <Image
              src={Inventory}
              width={25}
              height={20}
              alt="Inventory"
              className="mr-3"
            />
            <p
              className="font-semibold"
              style={{ color: activeLink === "inventory" ? "blue" : "inherit" }}
            >
              Inventory
            </p>
          </div>
        </Link>
        <Link href="/order">
          <div
            className="flex mb-3 hover:bg-slate-300 py-3 rounded-xl w-fit pr-9 pl-2"
            onClick={() => handleClick("order")}
          >
            <Image
              src={Order}
              width={25}
              height={20}
              className="mr-3"
              alt="order"
            />

            <p
              className="font-semibold"
              style={{ color: activeLink === "order" ? "blue" : "inherit" }}
            >
              Orders
            </p>
          </div>
        </Link>
        <Link href="/suppliers">
          <div
            className="flex mb-3 hover:bg-slate-300 py-3 rounded-xl w-fit pr-9 pl-2"
            onClick={() => handleClick("suppliers")}
          >
            <Image
              src={Suppliers}
              width={25}
              height={20}
              alt="suppliers"
              className="mr-3"
            />

            <p
              style={{ color: activeLink === "suppliers" ? "blue" : "inherit" }}
              className="font-semibold"
            >
              Suppliers
            </p>
          </div>
        </Link>
        <Link href="/store">
          <div
            className="flex mb-[100px] hover:bg-slate-300 py-3 rounded-xl w-fit pr-9 pl-2"
            onClick={() => handleClick("store")}
          >
            <Image
              src={Store}
              width={25}
              height={20}
              className="mr-3"
              alt="store"
            />

            <p
              style={{ color: activeLink === "store" ? "blue" : "inherit" }}
              className="font-semibold"
            >
              Manage Store
            </p>
          </div>
        </Link>
        <hr />
        <hr />
        <hr />

        <Link href="/profile">
          <div
            className="flex mb-3 hover:bg-slate-300 py-3 rounded-xl w-fit pr-9 pl-2"
            onClick={() => handleClick("settings")}
          >
            <Image
              src={Settings}
              width={25}
              height={20}
              className="mr-3"
              alt="settings"
            />

            <p
              className="font-semibold"
              style={{ color: activeLink === "settings" ? "blue" : "inherit" }}
            >
              Profile
            </p>
          </div>
        </Link>
        <div
          className="flex mb-3 hover:bg-slate-300 py-3 rounded-xl w-fit pr-9 pl-2"
          onClick={() => handleClick("logout")}
        >
          <Image
            src={Logout}
            width={25}
            height={20}
            alt="logout"
            className="mr-3"
          />
          <p className="font-semibold">Logout</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
