import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import { ToastContainer, toast } from 'react-toastify'
import leadingImg from "../../assets/loading.svg";

export default function EditeCategory({category , setOpenEdite}) {

  const [name , setName] = useState('')
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(category.name)
  },[category])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Update category
    if (!name) {
      setError("Please enter a category name");
      return;
    } else {
      setError("");
    }

   try {
    setLoading(true)
    const response = axios.put(`${import.meta.env.VITE_API_URL}/categories/${category._id}` , {
      name
    },{
      headers : {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      }
    })
    console.log("Category updated successfully", response.data);
    
    toast.success("Category updated successfully")
    dispatch(fetchCategories())
    setLoading(false)
    setOpenEdite(false)
   }catch (error)  {
    console.error("Error updating category")
    setLoading(false)
   }
  } 

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="">Category Name</Label>
          <Input
            type="text"
            className={error && 'border-red-500'}
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="text-red-500 text-[12px]  leading-[10px]">{error}</p>}
        </div>
        <Button onClick={(e) => handleSubmit(e)}>
        {loading ? (
            <img src={leadingImg} width={30} alt="loading" />
          ) : (
            <span> Edit Category</span>
          )}
        </Button>
      </div>
    </div>
  );
}
