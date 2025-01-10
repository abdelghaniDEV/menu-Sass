import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import leadingImg from "../../assets/loading.svg";
import { fetchCategories } from "../../redux/slices/categoriesSlice";

export default function CreateCategory({ setOpenCreate }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    // Send to API
  
    // check if name
    if (!name) {
      setError("Please enter a category name");
      return;
    } else {
      setError("");
    }

    // send to API
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          name,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      console.log("sucessfully added category", response.data);
      toast.success("Category created successfully");
      setLoading(false);
      dispatch(fetchCategories());
      setOpenCreate(false);
    } catch (e) {
      console.error("error adding category", e);
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="">Category Name</Label>
          <Input
            type="text"
            className={error && 'border-red-500'}
            placeholder="Enter Category Name"
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="text-red-500 text-[12px]  leading-[10px]">{error}</p>}
        </div>
        <Button onClick={(e) => handleCreateCategory(e)}>
          {loading ? (
            <img src={leadingImg} width={30} alt="loading" />
          ) : (
            <span> Create Category</span>
          )}
        </Button>
      </div>
    </div>
  );
}
