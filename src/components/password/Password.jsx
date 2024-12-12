import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import axios from "axios";
import leadingImg from "../../assets/loading.svg";
import { ToastContainer, toast } from "react-toastify";

export default function Password({setOpenChangePassword}) {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
  });
  const [leading, setLoading] = useState(false);

  const checkData = () => {
    let isValid = true;
    const newError = { ...error };

    // check old password
    if (data.oldPassword === "") {
      newError.oldPassword = "Password is required";
      isValid = false;
    } else {
      newError.oldPassword = "";
    }

    // check new password
    if (data.newPassword === "") {
      newError.newPassword = "Password is required";
      isValid = false;
    } else if (data.newPassword.length < 8) {
      newError.newPassword = "Password must be at least 8 characters long";
      isValid = false;
    } else {
      newError.newPassword = "";
    }

    // check confirm Password
    if (data.confirmPassword === "") {
      newError.confirmPassword = "Confirme Passord is Required";
      isValid = false;
    } else if (data.confirmPassword !== data.newPassword) {
      newError.confirmPassword = "password is not mutch in new password";
      isValid = false;
    } else {
      newError.confirmPassword = "";
    }
    setError(newError);
    return isValid;
  };

  const handelChangePassword = async (e) => {
    e.preventDefault();
    if (checkData()) {
      // handle password change
      try {
        setLoading(true);
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/changePassword`,
          {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        console.log("Success change password", response.data);
        setLoading(false)
        toast.success('Success change password')
        setOpenChangePassword(false)
      } catch (err) {
        console.error(err);
        if(err.response) {
            setError({...error, oldPassword: err.response.data.message })
        }else {
          toast.error("network error")
        }
        setLoading(false)
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 relative">
          <Label>Old Password</Label>
          <Input
            type={show.oldPassword ? "text" : "password"}
            placeholder="Entre Old Password"
            onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
            className={error.oldPassword && "border-red-500"}
          />
          <Eye
            className="absolute top-[50%] right-[4px] w-5 h-5 cursor-pointer"
            onClick={() => setShow({ ...show, oldPassword: !show.oldPassword })}
          />
          {error.oldPassword && (
            <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
              {error.oldPassword}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <Label>New Password</Label>
          <Input
            type={show.newPassword ? "text" : "password"}
            placeholder="Entre New Password"
            className={error.newPassword && "border-red-500"}
            onChange={(e) => setData({ ...data, newPassword: e.target.value })}
          />
          <Eye
            className="absolute top-[50%] right-[4px] w-5 h-5 cursor-pointer"
            onClick={() => setShow({ ...show, newPassword: !show.newPassword })}
          />
          {error.newPassword && (
            <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
              {error.newPassword}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm New Password"
            className={error.confirmPassword && "border-red-500"}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />
          {error.confirmPassword && (
            <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
              {error.confirmPassword}
            </p>
          )}
        </div>
        <Button
          className="mt-2 text-[16px]"
          onClick={(e) => handelChangePassword(e)}
        >
          {leading ? (
            <img src={leadingImg} width={30} alt="loading" />
          ) : (
            <span>Change Passord</span>
          )}
        </Button>
      </div>
    </div>
  );
}
