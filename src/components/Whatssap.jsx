import React from "react";
import { motion } from "framer-motion";
import avatar from "../assets/FB_IMG_1705437194399.jpg"

export default function Whatsapp() {
    const phoneNumber = "+212636998077";
    const whatsappLink = `https://wa.me/${phoneNumber}`;
  return (
    <motion.div
    
      className="fixed bottom-[40px] z-[1000] right-6"
      initial={{ scale: 0 }} // 
      animate={{ scale: 1 }} // 
      transition={{ type: "spring", stiffness: 260, damping: 20 }} // 
      whileHover={{ scale: 1.1 }} // 
    >
      <a href={whatsappLink} target="_blank"  rel="noopener noreferrer" className="flex bg-green-400 text-black  rounded-[40px] p-1 items-center gap-1">
        <div className="bg-white rounded-[40px] h-6 w-6 flex justify-center items-center">
          <img src={avatar} alt="avatar" className="h-6 w-6 rounded-full" />
        </div>
        <p className="text-[13px] font-[500]">Contact Me</p>
        <div className="rounded-[40px] h-6 w-6 flex justify-center items-center">
          <i className="bx bxl-whatsapp text-white text-[20px]"></i>
        </div>
      </a>
    </motion.div>
  );
}