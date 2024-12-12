import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChefHat,
  ImageUp,
  Lock,
  MapPinHouse,
  Phone,
  SendHorizonal,
  ShieldCheck,
  User,
  UserCog,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React, { useEffect, useState } from "react";
import leadingImg from "../assets/loading.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProfile } from "../redux/slices/profileSlice";
import Password from "../components/password/Password";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
  const profile = useSelector((state) => state.profile);
  const [leading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
  });
  const [openChangePassword, setOpenChangePassword] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    if (profile) {
      setData({
        name: profile.name,
        email: profile.email,
      });
    }
  }, [profile]);

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
    // check email
    if (data.email === "") {
      isValid = false;
      newError.email = "Email is required";
    }else if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
      isValid = false;
      newError.email = "Please enter a valid email address."
    } else {
      newError.email = "";
    }

    setError(newError);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // update profile
    if (checkData()) {
      try {
        setLoading(true);
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          {
            name: data.name,
            email: data.email,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        console.log("Profile updated successfully", response.data);
        dispatch(fetchProfile());
        setLoading(false);
        toast.success('Profile updated successfully')
      } catch (error) {
        console.error("Error updating profile", error);
        setLoading(false);
        toast.error("network error")
      }
    }
  };

  return (
    <div>
    <ToastContainer />
      <div>
        <div className="relative">
          <div className="flex justify-center md:container   relative z-[10]">
            <Card className="py-5 px-2 w-full md:px-10 md:w-[800px] mb-10 relative overflow-hidden">
              <div className="flex justify-center flex-col items-center">
                <UserCog className="h-16 w-16 md:h-20 md:w-20 bg-main-secondary rounded-full p-2" />
                <h2 className="text-center text-[25px] md:text-[30px] font-[700]">
                  Profile Settings
                </h2>
              </div>
              <div className="py-[10px] mb-[10px] flex flex-col gap-5  ">
                <div className="grid md:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 relative">
                      <Label>Full Name</Label>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        className={error.name && "border-red-500"}
                        value={data.name}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                      />
                      <User className="absolute top-[50%] right-[4px] w-5 h-5 " />
                      {error.name && (
                        <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
                          {error.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2 relative">
                        <Label>Email</Label>
                        <Input
                          type="text"
                          placeholder="email address"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                          className={error.email && "border-red-500"}
                        />
                        <Phone className="absolute top-[50%] right-[4px] w-5 h-5 " />
                        {error.email && (
                        <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
                          {error.email}
                        </p>
                      )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2 relative">
                        <Label>Change Password</Label>
                        <Button className="flex gap-1 items-center bg-[#08272a]" onClick={() => setOpenChangePassword(true)}>
                          <span>Change Password</span>
                          <Lock />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Subscription</Label>
                    <Card className="p-4 flex flex-col gap-2">
                      <div className="flex gap-2 ">
                        <h3 className="font-[500]">Plan : </h3>
                        <span className="flex gap-1 items-center bg-main-secondary text-main-primary px-1 rounded-[10px] text-[13px] font-[500]">
                          {profile?.subscription?.plan} Plan{" "}
                          {profile?.subscription?.plan === "free" &&
                            "(14 days)"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <h3 className="font-[500]">Start Date : </h3>
                        <span className="flex gap-1 items-center bg-green-300 px-1 rounded-[10px] text-[13px] font-[400]">
                          {new Date(
                            profile?.subscription?.startDate
                          ).toDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <h3 className="font-[500]">End Date : </h3>
                        <span className="flex gap-1 items-center bg-red-300 px-1 rounded-[10px] text-[13px] font-[400]">
                          {new Date(
                            profile?.subscription?.endDate
                          ).toDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <h3 className="font-[500]">Status : </h3>

                        <span className="flex gap-1 items-center bg-green-300 px-1 rounded-[10px] text-[13px] font-[400]">
                          {" "}
                          <ShieldCheck className="w-4 h-4" />
                          {profile?.subscription?.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <h3 className="font-[500]">Amount Paid : </h3>
                        <span>$ {profile?.subscription?.amountPaid} </span>
                      </div>
                      <Button className="flex items-center ">
                        <span>Upgrade Plan</span>
                        <SendHorizonal />
                      </Button>
                    </Card>
                  </div>
                </div>

                <Button
                  className="mt-2 text-[16px]"
                  onClick={(e) => handleSubmit(e)}
                >
                  {leading ? (
                    <img src={leadingImg} width={30} alt="loading" />
                  ) : (
                    <span> Save Settings</span>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[600]">
              Change Password
            </DialogTitle>
            <div>
              <Password  setOpenChangePassword={setOpenChangePassword}/>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
