import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, ImageUp, MapPinHouse, Phone, Store } from "lucide-react";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo-v2.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import leadingImg from "../assets/loading.svg"
import { ToastContainer, toast } from "react-toastify";
import { fetchRestuarant } from "../redux/slices/restuarantSlice";

export default function Business() {
  const restaurant = useSelector((state) => state.restuarant);
  const [data, setData] = useState({
    name: "",
    phone: "",
    description: "",
    address: "",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (restaurant) {
      setData({
        name: restaurant.name,
        phone: restaurant.phone,
        description: restaurant.description,
        address: restaurant.address,
      });

      setPrevUrl(restaurant?.image);
    }
  }, [restaurant]);

  const checkData = () => {
    let isValid = true;
    let newError = { ...error };

    // check name
    if (data.name === "") {
      isValid = false;
      newError.name = "Name is required";
    } else {
      newError.name = "";
    }

    // check phone
    if (data.phone === "") {
      isValid = false;
      newError.phone = "Phone Number is required";
    } else if (!data.phone.length === 10) {
      isValid = false;
      newError.phone = "Please enter a valid phone number";
    } else {
      newError.phone = "";
    }

    // check address
    if (data.address === "") {
      isValid = false;
      newError.address = "Address is required";
    } else {
      newError.address = "";
    }

    setError(newError);
    console.log(error)
    return isValid;
  };

  const handelSubmite = async (e) => {
    e.preventDefault();
    if (checkData()) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.description) formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);

      // call api to update restaurant data
      try {
        setLoading(true);
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/restaurants/my-restaurant`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        console.log("sucessfully updated Business", response.data);
        dispatch(fetchRestuarant())
        setLoading(false);
        toast.success("Business updated successfully");
      } catch (err) {
        console.error("Error updating Business data:", err);
        setLoading(false);
        toast.error("Network error")
      }
    }
  };

  return (
    <div>
    <ToastContainer />
      <div>
        <div className="relative">
          <div className="flex justify-center md:container   relative z-[10]">
            <Card className="py-5 px-2 w-full  md:px-10 md:w-[800px] mb-10 relative overflow-hidden">
              <div className="flex justify-center flex-col items-center">
                <Store className="h-16 w-16 md:h-20 md:w-20 bg-main-secondary rounded-full p-2" />
                <h2 className="text-center text-[25px] md:text-[30px] font-[700]">
                  Business Settings
                </h2>
              </div>
              <form className="py-[10px] mb-[10px] flex flex-col gap-5  ">
                <div className="grid md:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 relative">
                      <Label>Business Name</Label>
                      <Input
                        type="text"
                        placeholder="Business Name"
                        value={data.name}
                        className={error.name && "border-red-500"}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                      />
                      {error.name && (
                          <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                            {error.name}
                          </p>
                        )}
                      <ChefHat className="absolute top-[50%] right-[4px] w-5 h-5 " />
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2 relative">
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={data.phone}
                          onChange={(e) =>
                            setData({ ...data, phone: e.target.value })
                          }
                        />
                        {error.phone && (
                          <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                            {error.phone}
                          </p>
                        )}
                        <Phone className="absolute top-[50%] right-[4px] w-5 h-5 " />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Business Description</Label>
                        <textarea
                          type="text"
                          placeholder="Business Description"
                          className="h-[200px] focus:outline-none bg-[#F4F7F9] rounded-[12px] px-3 py-2 text-sm "
                          value={data.description}
                          onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 relative">
                      <Label>Address</Label>
                      <Input
                        type="text"
                        placeholder="Address"
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className={error.address && "border-red-500"}
                        value={data.address}
                      />
                      {error.address && (
                        <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                          {error.address}
                        </p>
                      )}
                      <MapPinHouse className="absolute top-[50%] right-[4px] w-5 h-5 " />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Business Logo</Label>

                      <div className="flex items-center justify-center w-full ">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-55 border-2 rounded-[20px] border-dashed	 "
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageUp className="mb-3" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              setData({ ...data, image: e.target.files[0] })
                            }
                          />
                        </label>
                      </div>

                      <div className="mt-5">
                        <img
                          src={
                            data.image
                              ? URL.createObjectURL(data.image)
                              : prevUrl
                          }
                          width={200}
                          height={200}
                          alt="Business  Logo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="mt-2 text-[16px]"
                  onClick={(e) => handelSubmite(e)}
                >
                  {loading ? (
                    <img src={leadingImg} width={30} alt="loading" />
                  ) : (
                    <span> Save Settings</span>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
