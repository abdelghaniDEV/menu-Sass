import {
  ChevronLeft,
  ChevronsLeft,
  PanelLeft,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { Card } from "./ui/card";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import logoV3 from "../assets/logo-v3.png";
import { fetchMenu } from "../redux/slices/menuSlice";
import { fetchRestuarant } from "../redux/slices/restuarantSlice";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchProfile } from "../redux/slices/profileSlice";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

export default function SideBar({ openMenu, setOpenMenu }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchRestuarant());
    dispatch(fetchCategories());
    dispatch(fetchProfile());
  }, []);

  const restaurant = useSelector((state) => state.restuarant);
  const profile = useSelector((state) => state.profile);

  return (
    <div
      className={`bg-[#F9F9F9] px-5 w-[250px] h-full min-h-screen absolute z-[1000] 
  transform ${openMenu ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 transition-transform duration-300 ease-in-out md:relative py-4`}
    >
      <X
        className="h-10 w-10 bg-main-secondary md:hidden p-1 cursor-pointer"
        onClick={() => setOpenMenu(false)}
      />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className=" w-full text-start">
          <Card
            className=" flex items-center justify-between border-[1px] p-[6px]  rounded-[6px]"
            onClick={() => setOpen(true)}
          >
            <div className="flex gap-2 items-center">
              <img
                className="w-10 h-10 bg-main-primary p-1 rounded-[10px]"
                src={logoV3}
              />
              <div className="">
                <h4 className="leading-[15px] font-[600] truncate ">
                  {restaurant?.name}
                </h4>
                <span className="text-[13px]">
                  {profile?.subscription?.plan} Plann
                </span>
              </div>
            </div>
            <ChevronsLeft />
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[10000]">
          <DropdownMenuLabel>{restaurant?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={"/dashboard/business"} className="font-[500]">
              Your Business
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="font-[500]">Status : </span>

            <span className="flex gap-1 items-center bg-green-300 px-1 rounded-[10px] text-[13px] font-[400]">
              <ShieldCheck className="w-4 h-4" />
              {profile?.subscription?.status}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="font-[500]">Start Date : </span>
            <span className="flex gap-1 items-center bg-green-300 px-1 rounded-[10px] text-[13px] font-[400]">
              {new Date(profile?.subscription?.startDate).toDateString()}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="font-[500]">End Date : </span>
            <span className="flex gap-1 items-center bg-red-300 px-1 rounded-[10px] text-[13px] font-[400]">
              {new Date(profile?.subscription?.endDate).toDateString()}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="pt-5 flex flex-col justify-between h-screen ">
        <Navbar setOpenMenu={setOpenMenu} />
        <Card className="p-3 flex flex-col justify-center items-center gap-2 bg-custom-bg ">
          <h2 className="font-[600] text-[18px] leading-[20px]">
            Becom Pro Access
          </h2>
          <p className="text-[14px] text-center font-[500] text-white">
            Unlock all the features of Pro, including
          </p>
          <Button className="b bg-main-primary text-white w-full">
            <Sparkles />
            <span>Upgrade Pro</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}
