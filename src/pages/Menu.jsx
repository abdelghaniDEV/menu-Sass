import { ImageUp, Table } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import loadingImg from "../assets/loading.svg";

import TemplateMenu from "../components/Template";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function Menu() {
  const [Template, setTemplate] = useState({});
  const [prevUrl, setPrevUrl] = useState();
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(Template);
  }, [Template]);

  const menu = useSelector((state) => state.menu);

  useEffect(() => {
    if (menu.template) {
      setTemplate({
        primaryColor: menu.template.primaryColor,
        BackgroundColor: menu.template.BackgroundColor,
        textColor: menu.template.textColor,
        titleColor: menu.template.titleColor,
        fontFamily: menu.template.fontFamily,
        language: menu.template.language,
        currency: menu.template.currency,
      });
      setPrevUrl(menu.template.banner);
    }
  }, [menu]);

  const handelSubmite = async (e) => {
    e.preventDefault();

    console.log("Current Template Data:", Template);

    const formData = new FormData();

    // إضافة القيم إلى الـ FormData
    formData.append("primaryColor", Template.primaryColor);
    formData.append("backgroundColor", Template.BackgroundColor);
    formData.append("textColor", Template.textColor);
    formData.append("titleColor", Template.titleColor);
    formData.append("fontFamily", Template.fontFamily);
    formData.append("language", Template.language);
    formData.append("currency", Template.currency);
    formData.append("showBanner", showBanner);

    if (Template.banner) {
      formData.append("banner", Template.banner);
    }

    console.log("FormData to be sent:", Object.fromEntries(formData.entries()));

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/menus/owner/${menu._id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
            "Content-Type": "multipart/form-data", // إضافة نوع المحتوى
          },
        }
      );

      console.log("Menu template updated successfully", response.data);
      setLoading(false);
      toast.success("Saved is complete successfully");
    } catch (e) {
      console.error("Error updating menu template:", e);
      setLoading(false);
      if (e.response) {
        console.error("Error:", e.response.data);
        toast({
          title: e.response.data.message,
          variant: "destructive",
        });
      } else {
        console.error("Network error or server is down");
        toast({
          title: "Network error",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="py-5 px-5 mx-6 flex gap-8 bg-white ">
      <div className=" ">
        <ToastContainer />
        <div className="flex flex-col gap-3">
          <Label className="">Restaurant Banner</Label>

          <div className="flex gap-5">
            <div>
              <label
                id="input-image"
                htmlFor="dropzone-file"
                className="flex flex-col items-center w-[200px] h-[200px] justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#EEEEEE]  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageUp className="text-main-secondary bg-main-primary p-1 rounded-full h-8 w-8" />
                  <p>Upload</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setTemplate((prev) => {
                      return { ...prev, banner: e.target.files[0] };
                    })
                  }
                />
              </label>
              <div className="flex flex-col gap-2"></div>
            </div>
            <div className="cursor-pointer">
              <img
                src={
                  Template?.banner
                    ? URL.createObjectURL(Template?.banner)
                    : prevUrl
                }
                // alt="restaurant banner"
                className="rounded-[10px] object-cover w-[400px] h-[100px]"
                onClick={() => setTemplate({ ...Template, banner: null })}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span>Show Banner </span>
            <Switch
              checked={showBanner}
              onCheckedChange={(value) => setShowBanner(value)}
            />
          </div>
        </div>
        <div className="pt-6 ">
          <h2 className="font-[600] text-[20px] py-2">Color Settings</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* color setting */}
            <div className="flex flex-col gap-[9px]">
              <Label>Primary Color</Label>
              <div className="flex gap-1 items-center border-[1px] rounded-[20px] pr-3">
                <Input
                  type="color"
                  id="style1"
                  value={Template.primaryColor}
                  onChange={(e) =>
                    setTemplate((prev) => {
                      return { ...prev, primaryColor: e.target.value };
                    })
                  }
                />
                <span className="bg-gray-300 p-1 rounded-[10px]">
                  {Template.primaryColor}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[9px]">
              <Label>Background Color</Label>
              <div className="flex gap-1 items-center border-[1px]  rounded-[20px] pr-3">
                <Input
                  type="color"
                  id="style1"
                  value={Template.BackgroundColor}
                  className="border-black border-[2px]"
                  onChange={(e) =>
                    setTemplate((prev) => {
                      return { ...prev, BackgroundColor: e.target.value };
                    })
                  }
                />
                <span className="bg-gray-300 p-1 rounded-[10px]">
                  {Template.BackgroundColor}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[9px]">
              <Label>Text Color</Label>
              <div className="flex gap-1 items-center border-[1px] rounded-[20px] pr-3">
                <Input
                  type="color"
                  id="style1"
                  value={Template.textColor}
                  onChange={(e) =>
                    setTemplate((prev) => {
                      return { ...prev, textColor: e.target.value };
                    })
                  }
                />
                <span className="bg-gray-300 p-1 rounded-[10px]">
                  {Template.textColor}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[9px]">
              <Label>Product Title </Label>
              <div className="flex gap-1 items-center border-[1px] rounded-[20px] pr-3">
                <Input
                  type="color"
                  id="style1"
                  value={Template.titleColor}
                  onChange={(e) =>
                    setTemplate((prev) => {
                      return { ...prev, titleColor: e.target.value };
                    })
                  }
                />
                <span className="bg-gray-300 p-1 rounded-[10px]">
                  {Template.titleColor}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[9px] pt-6">
          <Label>Primary Font</Label>
          <Select
            onValueChange={(e) =>
              setTemplate({ ...Template, fontFamily: `"${e}", serif` })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={Template.fontFamily} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Poppins">Poppins</SelectItem>
              <SelectItem value="Outfit">Outfit</SelectItem>
              <SelectItem value="Tajawal">Tajawal "Arabic"</SelectItem>
              <SelectItem value="Noto Sans Arabic">Noto Sans Arabic</SelectItem>
              <SelectItem value="Instrument Sans">Instrument Sans</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-[9px] pt-6">
            <Label>Currency</Label>
            <Select
              onValueChange={(e) => setTemplate({ ...Template, currency: e })}
            >
              <SelectTrigger className="">
                <SelectValue placeholder={Template.currency} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD "USA"</SelectItem>
                <SelectItem value="EUR">EUR "Europe"</SelectItem>
                <SelectItem value="MAD">MAD "Morocco"</SelectItem>
                <SelectItem value="EGP">EGP "Egypt"</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-[9px] pt-6">
            <Label>Language</Label>
            <Select
              onValueChange={(e) => setTemplate({ ...Template, language: e })}
            >
              <SelectTrigger className="">
                <SelectValue
                  placeholder={
                    Template.language === "en" ? "English" : "Arabic"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="">
          <Button
            className="my-4 w-full text-[16px]"
            onClick={(e) => handelSubmite(e)}
          >
            {loading ? (
              <img src={loadingImg} width={30} alt="loading" />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
      </div>
      <div className="">
        <TemplateMenu Template={Template} />
      </div>
    </Card>
  );
}
