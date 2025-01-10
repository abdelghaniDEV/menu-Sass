import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductTemplate({ image, price, description, name , template}) {
  const [open, setOpen] = useState(false);


  return (
    <div className="flex justify-between md:flex-row-reverse border-b-[1px] cursor-pointer md:border-none pb-2  ">
    <div className="relative  z-40 " onClick={() => setOpen(true)}>
      <img
        src={image}
        className=" w-[80px]  h-[80px] border-[2px] border-white p-1 rounded-[20px]"
      />
      <div
        className="absolute bottom-0 right-[-15px] rounded-tl-full z-[-1] h-[80%]  w-[120px]"
        style={{
          backgroundColor: template?.primaryColor,
        }}
      ></div>
    </div>
    <div
      className="w-[70%] flex flex-col justify-between "
      onClick={() => setOpen(true)}
    >
      <div>
        <h1
          className="font-[600] text-[16px]"
          style={{
            color: template?.titleColor,
          }}
        >
          {name}
        </h1>
        <p className="text-[12px] overflow-hidden line-clamp-2">
          {description}
        </p>
      </div>
      <div>
        <span
          className="font-[600] text-[13px]"
          style={{
            color: template?.titleColor,
            fontSize : template?.language === 'en' ? '13px' : '13px',
            
          }}
        >
          {template?.currency} {price}
        </span>
      </div>
    </div>
    
  </div>
  );
}
