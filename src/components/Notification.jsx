import { X } from "lucide-react";
import React from "react";
import logoV3 from "../assets/logo-v3.png";

export default function Notification({setOpenNotification , profile}) {
  return (
    <div className="w-[400px] max-h-[500px] bg-white fixed right-5 md:right-[110px] p-2 top-[70px] md:top-[50px] shadow-lg border-[1px] z-[1000] rounded-[10px]">
      <div className="flex items-center justify-between text-[18px] font-[600]">
        <h3>Notification :</h3>
        <X
          className=" bg-main-secondary h-8 w-8 p-1 rounded-full cursor-pointer"
          onClick={() => setOpenNotification(false)}
        />
      </div>
      <div className="py-2">
        <div className="flex items-center text-[13px] gap-2 border-[1px] p-1 rounded-[5px]">
          <img
            src={logoV3}
            className="w-12 h-12 rounded-full border-[1px] p-1"
          />
          <div>
            <h4 className="l leading-[10px] text-[16px] pb-1 font-[500]">
              {profile.name}
            </h4>
            <p className="leading-[14px]">
              Wolcom MR{" "}
              <span className="t uppercase font-[500]">{profile.name}</span> ,
              New youcant create Menu Degital white Dineo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
