

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brush,
  Cake,
  ChartNoAxesColumn,
  ChefHat,
  CircleArrowRight,
  CircleCheck,
  FileText,
  FolderSync,
  HandPlatter,
  IceCreamBowl,
  ImageUp,
  Languages,
  MoveUpRight,
  Pizza,
  QrCode,
  Sandwich,
  Sparkles,
  StepForward,
} from "lucide-react";
import image02 from "../assets/image-01.png";
import restMenu from "../assets/digital-menu.webp";
import qrMenu from "../assets/QR-MENU.png";
import restService from "../assets/res-service.webp";
import menuF from "../assets/menu-ff.jpeg";
import restCost from "../assets/res-cost.jpeg";
import restFood from "../assets/images-food.jpg";
import menuDigital from "../assets/menu-digital.webp";
import logo from "../assets/logo-v2.png";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="  ">
      <div className="relative container my-[20px]">
        <div className="flex flex-col gap-4 md:gap-6  items-center md:px-[70px]">
          <h1 className="text-[25px] md:text-[55px] leading-[30px] text-center font-[500] md:leading-[65px]">
            Create your restaurant menu easily and start attracting your
            customers today!
          </h1>
          <p className="text-center ">
            Transform your menu into a digital experience that's easy to update
            and available on all devices.
          </p>
          <div className="flex items-center gap-5">
            <Button className="text-main-secondary">Get Start For Free</Button>
            <Button className="bg-white text-main-primary border-[1.5px] hover:text-white">
              Try Demo
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2  md:grid-cols-5 items-end gap-5 my-4 ">
          <Card className="h-[300px] overflow-hidden hidden md:block">
            <img src={image02} alt="hero" />
          </Card>
          <Card className="bg-main-primary h-[200px] hidden md:block text-white"></Card>
          <Card className="h-[150px] p-3">
            <HandPlatter className="h-8 w-8 bg-main-secondary rounded-[10px] py-2" />
            <p className="text-[18px] font-[500]">Total Restaurant </p>
            <h3 className="text-[30px] font-[600] leading-[35px]">250 + </h3>
            <p className="text-[13px]">
              last Month <span className="text-green-500">100 +</span>
              Restaurants
            </p>
          </Card>
          <Card className="bg-main-secondary h-[200px] hidden md:block"></Card>
          <Card className="h-[300px] overflow-hidden">
            <img src={image02} alt="hero" />
          </Card>
        </div>
        <div className="hidden md:block">
          <FileText className="absolute h-12 w-12 rounded-full p-3 top-[30%] left-[10%] bg-main-secondary" />
          <MoveUpRight className="absolute h-10 w-10 p-2 top-[40%] left-[30%] border-[2px] rounded-full border-main-primary" />
          <IceCreamBowl className="absolute h-12 w-12 top-0 text-white bg-main-primary p-3 rounded-full" />
          <ChartNoAxesColumn className="absolute h-12 w-12 top-[40%] text-white right-[30%] bg-main-primary p-3 rounded-full" />
          <Sparkles className="absolute h-12 w-12 rounded-full p-3 top-[30%] right-[10%] bg-main-secondary" />
        </div>
      </div>
      <div className="bg-main-primary mt-[50px] ">
        <div className="container text-white py-10">
          <div className="text-center ">
            <h2 className="text-[25px] leading-[25px] md:text-[40px]">
              Everything you need to get the Menu for your project
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mt-10 ">
            <Card className="bg-[#153E44] text-white p-6 border-none">
              <Brush className="w-12 h-12 border-[1px] p-3 rounded-[10px]" />
              <div className="pt-10">
                <h4 className="text-[20px]">Full menu customization</h4>
                <p className="text-[13px] font-[200]">
                  Give your restaurant a unique identity with menus tailored to
                  your needs, offering options to change colors, fonts, and
                  designs to match your restaurant's theme.
                </p>
              </div>
            </Card>
            <Card className="bg-[#153E44] text-white p-6 border-none">
              <img className="w-12 h-12 border-[1px] p-3 rounded-[10px]" />
              <div className="pt-10">
                <h4 className="text-[20px]">
                  Add Stunning Images and Dish Descriptions
                </h4>
                <p className="text-[13px] font-[200]">
                  Bring your menu to life with high-quality images and enticing
                  descriptions to help your customers make quick decisions.
                </p>
              </div>
            </Card>
            <Card className="bg-[#153E44] text-white p-6 border-none">
              <FolderSync className="w-12 h-12 border-[1px] p-3 rounded-[10px]" />
              <div className="pt-10">
                <h4 className="text-[20px]">Real-Time Menu Updates</h4>
                <p className="text-[13px] font-[200]">
                  No need to wait! Add new dishes or adjust prices effortlessly,
                  and the updates will instantly reflect on your digital menu.
                </p>
              </div>
            </Card>
            <Card className="bg-[#153E44] text-white p-6 border-none">
              <Languages className="w-12 h-12 border-[1px] p-3 rounded-[10px]" />
              <div className="pt-10">
                <h4 className="text-[20px]">Multi-Language Support</h4>
                <p className="text-[13px] font-[200]">
                  Expand your reach to a wider audience with the ability to
                  display your menu in multiple languages, ensuring an
                  exceptional experience for all.
                </p>
              </div>
            </Card>
            <Card className="bg-[#153E44] text-white p-6 border-none">
              <QrCode className="w-12 h-12 border-[1px] p-3 rounded-[10px]" />
              <div className="pt-10">
                <h4 className="text-[20px]">
                  QR Code Integration for Easy Access
                </h4>
                <p className="text-[13px] font-[200]">
                  Generate a unique QR code for your menu, allowing customers to
                  scan and view the menu instantly on their smartphones without
                  downloading any app.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className=" container relative">
        <h1 className="text-[25px] text-center md:text-[35px] leading-[25px] font-[600] py-6 md:py-10">
          Simply scan the QR code to view your menu
        </h1>

        <div className=" relative w-full rounded-[20px] md:p-[40px] z-[2000]  grid items-center justify-between grid-cols-1 gap-10 md:grid-cols-2 ">
          <img src={menuDigital} className="w-[450px]  " alt="menuDigital" />
          <div className="flex flex-col gap-4 items-center ">
            <img src={logo} width={250} alt="logo" />
            <p className="md:text-[20px] text-center">
              Our smart digital menu for restaurants is powered by technology
              that has been used in the hospitality business since 2018
            </p>
            <Button className=" w-full text-main-secondary flex items-center">
              <span>Get Start For Free</span>
              <StepForward className="h-[40px] w-[40px]" />
            </Button>
          </div>
        </div>
        <div>
          <Pizza className="w-[100px] h-[100px] hidden md:block z-0 absolute top-[30px] right-[60px] text-main-secondary bg-main-primary p-3 rounded-full" />
          <Cake className="w-[200px] h-[200px] hidden md:block absolute top-0 left-[10%] text-slate-300 rotate-40" />
          <ChefHat className="w-[300px] h-[300px] hidden md:block absolute bottom-0 right-0 text-slate-300" />
          <Sandwich className="w-[300px] h-[300px] hidden md:block absolute bottom-0 left-0 text-slate-300 rotate-45" />
        </div>
      </div>
      <div className="container">
        <h1 className="text-[25px] text-center leading-[25px] md:text-[35px] font-[600] py-6 md:py-10">
          Why restaurant operators love us
        </h1>
        <div className="grid md:grid-cols-3 gap-10 ">
          <Card>
            <img
              src={qrMenu}
              className="h-[200px] w-full rounded-t-[10px]"
              alt="Easy Menu Items and Prices Updates"
            />
            <div className="p-4 text-center">
              <h2 className="text-[25px] font-[600] leading-[25px] pb-2">
                Transition to Contactless Ordering
              </h2>
              <p>
                Make the ordering experience safer and more convenient with
                modern technologies that allow your customers full control via
                their smartphones
              </p>
            </div>
          </Card>
          <Card>
            <img
              src={restMenu}
              className="h-[200px] w-full rounded-t-[10px]"
              alt="Easy Menu Items and Prices Updates"
            />
            <div className="p-4 text-center">
              <h2 className="text-[25px] font-[600] leading-[25px] pb-2">
                Easy Menu Items and Prices Updates
              </h2>
              <p>
                Update your dishes and prices anytime with ease, giving you the
                flexibility to adapt to market changes or promotional offers.
              </p>
            </div>
          </Card>
          <Card>
            <img
              src={restService}
              className="h-[200px] w-full rounded-t-[10px]"
              alt="Easy Menu Items and Prices Updates"
            />
            <div className="p-4 text-center">
              <h2 className="text-[25px] font-[600] leading-[25px] pb-2">
                Reduce Wait Times
              </h2>
              <p>
                Speed up the ordering process with digital menus that enable
                customers to receive their orders quickly and efficiently
              </p>
            </div>
          </Card>
          <Card>
            <img
              src={menuF}
              className="h-[200px] w-full rounded-t-[10px]"
              alt="Easy Menu Items and Prices Updates"
            />
            <div className="p-4 text-center">
              <h2 className="text-[25px] font-[600] leading-[25px] pb-2">
                Increase order accuracy
              </h2>
              <p>
                Speed up the ordering process with digital menus that enable
                customers to receive their orders quickly and efficiently
              </p>
            </div>
          </Card>
          <Card>
            <img
              src={restCost}
              className="h-[200px] w-full rounded-t-[10px]"
              alt="Easy Menu Items and Prices Updates"
            />
            <div className="p-4 text-center">
              <h2 className="text-[25px] font-[600] leading-[25px] pb-2">
                Cost-Effective Solutions
              </h2>
              <p>
                Save costs by using digital technologies that reduce the need
                for constant printing and updating of physical menus.
              </p>
            </div>
          </Card>
          <Card>
            <img
              src={restFood}
              className="h-[200px]   rounded-t-[10px] w-full"
              alt="Easy Menu Items and Prices Updates"
            />
            <div className="p-4 text-center">
              <h2 className="text-[25px] font-[600] leading-[25px] pb-2">
                Enhance customer experience
              </h2>
              <p>
                Elevate the dining experience with our customer-friendly
                interactive restaurant menu features, turning satisfied
                customers into loyal patrons
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="bg-[#0B0F13] my-[55px]">
        <div className="container py-[35px]">
          <h1 className="text-[25px] text-center md:text-[35px] leading-[25px] text-white font-[600] pb-10">
            Choose the Perfect Plan for Your Restaurant
          </h1>
          <div className=" grid md:grid-cols-3 gap-8">
            <Card className="p-5 bg-[#1E2226] text-white border-none ">
              <h3 className="text-[30px] font-[00] pb-8">Free Plan</h3>

              <h4 className="text-[25px] font-[500] py-2">
                $0 <span className="font-[200] text-[18px]">/ Month</span>
              </h4>
              <Button className="w-full bg-inherit border-[1px] border-main-secondary">
                Get Started
              </Button>
              <div className="text-center pt-5">
                <span className="text-center py-1   border-b-[1px] border-main-secondary">
                  Features
                </span>
                <div className="flex flex-col gap-2 mt-3 text-[15px]">
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>One menu.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Up to 10 items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Basic design with no customization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Customizable QR code</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-5 bg-[#0B363C] text-white border-none   ">
              <h3 className="text-[30px] font-[00] pb-8">Basic Plan</h3>

              <h4 className="text-[25px] font-[500] py-2">
                100 MAD <span className="font-[200] text-[18px]">/ Month</span>
              </h4>
              <Button className="w-full bg-inherit bg-main-secondary text-black">
                Get Started
              </Button>
              <div className="text-center pt-5">
                <span className="text-center py-1   border-b-[1px] border-main-secondary">
                  Features
                </span>
                <div className="flex flex-col gap-2 text-start mt-3 text-[15px]">
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Up to 3 menus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Up to 50 items</span>
                  </div>
                  <div className="flex  gap-2">
                    <CircleCheck />
                    <span>
                      Limited design templates with basic <br /> customization
                      options{"  "}(collor and fonts)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Customizable QR code</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-5 bg-[#1E2226] text-white border-none">
              <h3 className="text-[30px] font-[00] pb-8">Pro Plan</h3>

              <h4 className="text-[25px] font-[500] py-2">
                220 MAD<span className="font-[200] text-[18px]">/ Month</span>
              </h4>
              <Button className="w-full bg-inherit border-[1px] border-main-secondary">
                Get Started
              </Button>
              <div className="text-center pt-5">
                <span className="text-center py-1   border-b-[1px] border-main-secondary">
                  Features
                </span>
                <div className="flex flex-col gap-2 text-start mt-3 text-[15px]">
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Unlimited menus and items.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>
                      Fully customizable design (colors, images, fonts)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Multi-language support (e.g., Arabic, French)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheck />
                    <span>Basic analytics, such as menu visitor count </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
