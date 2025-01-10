import React from "react";
import { Card } from "./ui/card";
import { Globe, Info, Search } from "lucide-react";
import ProductTemplate from "./ProductTemplate";
import saladNwasi from "../assets/nwaci.avif";
import sandwitch from "../assets/sandwitch.jpg";
import pitza from "../assets/pitza Dogh.jpg";
import tacos from "../assets/taccos.jpg";
import pitza2 from "../assets/pitza.avif";
import banndr from "../assets/banner-food.avif";
import { ScrollArea } from "@/components/ui/scroll-area"


export default function TemplateMenu({ Template }) {
  return (
    <ScrollArea
      className={`w-[430px]  h-[700px] overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm `}
      style={{ backgroundColor: Template.BackgroundColor , color : Template.textColor , fontFamily: Template.fontFamily }}
    >
      {/* Template content */}
      <div className="flex justify-between py-[10px] items-center px-4 " >
        <div>
          <span className="text-[20px] font-[600]">Logo Restaurant</span>
        </div>
        <div className="flex gap-2">
          <Globe
            className="text-white  p-1 rounded-full h-8 w-8"
            style={{ backgroundColor: Template.primaryColor }}
          />
          {/* <Info className="text-white bg-[#F56949] p-1 rounded-full h-8 w-8" /> */}
        </div>
      </div>
      {/* {Template.banner && <div>
        <img src={URL.createObjectURL(Template.banner)} className="rounded-[20px] h-[200px] w-full" />
      </div>} */}
      <div>
        <div>
          <div className="relative my-2 px-4">
            <input
              type="text"
              placeholder="Search Here ..."
              className="h-10 rounded-[20px] text-base w-full bg-[#F5F5F8] px-4 py-2 focus:outline-none "
            />
            <Search className="absolute right-[10px] top-[10px]" 
                style={{ 
                    color : Template.primaryColor
                 }}
            />
          </div>
          <div className="grid grid-cols-4 px-4">
            <button
              className={`h-8 w-[80px] border-[1px] rounded-[6px] mx-1 text-[14px] text-white`}
              style={{
                
                
                backgroundColor : Template.primaryColor,
                
              }}
            >
              Salade
            </button>
            <button className={`h-8 w-[80px] border-[1px] rounded-[6px] mx-1 text-[14px]`}>
              Burger
            </button>
            <button className={`h-8 w-[80px] border-[1px] rounded-[6px] mx-1 text-[14px]`}>
              Sandwich
            </button>
            {/* <Button
              className="h-8 w-[80px] border-[1px] rounded-[6px] mx-1 text-[14px]"
              style={{
                backgroundColor:
                  activeCategory === category._id
                    ? template.primaryColor
                    : "#F5F5F8",
                color: activeCategory === category._id ? "white" : "black",
              }}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </Button> */}
            <button className={`h-8 w-[80px] border-[1px] rounded-[6px] mx-1 text-[14px]`}>
              Tacos
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 py-5 px-4">
            <ProductTemplate
              name={"Salad FRUIT"}
              description={
                "Enjoy a week of easy, filling and nourishing cooking (and eating) as the days grow cooler."
              }
              price={45.75}
              image={saladNwasi}
              template={Template}
            />
            <ProductTemplate
              name={"Checken Shawarma"}
              description={"Enjoy a week of easy, filling and nourishing cooking (and eating) as the days grow "}
              price={25.69}
              image={sandwitch}
              template={Template}
            />
            <ProductTemplate
              name={"Pitza Dogh"}
              description={
                "Enjoy a week of easy, filling and nourishing cooking (and eating) as the days grow cooler. "
              }
              price={25.69}
              image={pitza}
              template={Template}
            />
            <ProductTemplate
              name={"Ground Beef Tacos"}
              description={
                "Enjoy a week of easy, filling and nourishing cooking (and eating) as the days grow cooler. "
              }
              price={56.99}
              image={tacos}
              template={Template}
            />
            <ProductTemplate
              name={"Ground Beef Tacos"}
              description={
                "Enjoy a week of easy, filling and nourishing cooking (and eating) as the days grow cooler. "
              }
              price={56.99}
              image={pitza2}
              template={Template}
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
