import {
    HandPlatter,
    LayoutDashboard,
    Store,
    Tags,
    UserCog,
  } from "lucide-react";

  import React from "react";
import { Link } from "react-router";
  
  export default function Navbar({setOpenMenu}) {
    return (
      <>
        <nav className="">
          <ul className="flex flex-col gap-7 ">
            <li className="flex gap-3 items-center">
              <HandPlatter />
              <span>Menu</span>
            </li>
            <Link to={'/dashboard/categories'} className="flex gap-3 items-center" onClick={() => setOpenMenu(false)}>
              <LayoutDashboard />
              <span>Categories</span>
            </Link>
            <Link to={'/dashboard/products'} className="flex gap-3 items-center" onClick={() => setOpenMenu(false)}>
              <Tags />
              <span>Meals</span>
            </Link>
  
            <Link to={'/dashboard/business'} className="flex gap-3 items-center" onClick={() => setOpenMenu(false)}>
              <Store />
              <span>Business</span>
            </Link>
            <Link to={'/dashboard/profile'} className="flex gap-3 items-center" onClick={() => setOpenMenu(false)}>
              <UserCog />
              <span>Profile</span>
            </Link>
          </ul>
        </nav>
      </>
    );
  }
  