import {
  AlignJustify,
  Bell,
  HandPlatter,
  LogOut,
  ShieldCheck,
  SquareChevronRight,
  UserRoundPen,
} from "lucide-react";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import logoV3 from "../assets/logo-v3.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Navbar from "./Navbar";

export default function Header({ openMenu, setOpenMenu }) {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const menu = useSelector((state) => state.menu);
  console.log(menu);

  const handlerLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="py-4 ">
      <div className=" flex items-center justify-between relative">
        <AlignJustify
          className="w-8 h-8 md:hidden"
          onClick={() => setOpenMenu(true)}
        />
        <div className="md:flex gap-2 items-center hidden md:block ">
          <img
            className="w-12 h-12 bg-main-secondary p-1 rounded-full "
            src={logoV3}
          />
          <div className="flex flex-col gap-1">
            <span className="font-[600] leading-3">Hey,{profile.name}</span>
            <span className="text-[13px]">{profile.email}</span>
          </div>
        </div>
        <div className="flex gap-3">
          
          <HoverCard>
            <HoverCardTrigger>
            <Bell className="w-10 h-10 bg-main-secondary p-2 rounded-full cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent className="mx-20 w-[400px]">
              <div className="flex flex-col gap-1">
                <span className="font-[500]">You have 5 new notifications</span>
                <span className="text-[13px]">Check them out</span>
              </div>
              <div className="flex gap-2 items-center">
                <SquareChevronRight className="w-6 h-6" />
                <Link to="/dashboard/notifications" className="text-[15px]">
                  View All
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                className="w-10 h-10 bg-main-primary rounded-[15px] p-1 "
                src={logoV3}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-4 ">
              <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  to={"/dashboard/profile"}
                  className="font-[500] flex items-center gap-2"
                >
                  <UserRoundPen className="w-8 h-8" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-1">
                <span className="font-[500]">Email : </span>
                <span>{profile.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="font-[500]">Status : </span>

                <span className="flex gap-1 items-center bg-green-300 px-1 rounded-[10px] text-[13px] font-[400]">
                  <ShieldCheck className="w-4 h-4" />
                  {profile?.subscription?.status}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlerLogOut()}
                className="flex cursor-pointer items-center gap-1 bg-[#FDD8E0] text-[#F4164F] font-[500]"
              >
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card className="py-2 px-2 md:px-6 flex justify-between items-center mt-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] md:text-[30px] font-[600] md:leading-[30px]">
              Menu
            </h1>
            <HandPlatter />
          </div>
          <p className="text-[14px] md:text-[18px]">Craft Your Digital Menu</p>
        </div>
        <Card className="p-1 md:p-2  bg-main-secondary">
          <a
            href={`https://menu-demo-aokb.vercel.app//${menu.name}-${menu._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center"
          >
            <span className="text-[14px] nd:text-[16px] font-[600]">
              OPPEN MENU
            </span>
            <SquareChevronRight />
          </a>
        </Card>
      </Card>
    </div>
  );
}
