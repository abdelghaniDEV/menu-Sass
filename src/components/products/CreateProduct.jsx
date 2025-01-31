import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ImageUp, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import loadingImg from "../../assets/loading.svg"
import { fetchMenu } from "../../redux/slices/menuSlice";
export default function CreateProduct() {
  const categories = useSelector((state) => state.categories);
  const [loading , setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image: null,
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    category_id: "",
  });

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(data);
  }, [data]);

  const checkData = () => {
    let isValid = true;
    let newError = { ...error };

    // check Name
    if (data.name === "") {
      isValid = false;
      newError.name = "Name is required";
    } else {
      newError.name = "";
    }

    // check price
    if (data.price === "") {
      isValid = false;
      newError.price = "Price is required";
    } else {
      newError.price = "";
    }

    // check category
    if (data.category_id === "") {
      isValid = false;
      newError.category_id = "Category is required";
    } else {
      newError.category_id = "";
    }

    setError(newError);

    return isValid;
  };

  const handelSubmite = async (e) => {
    e.preventDefault();
    if (checkData()) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("categoryId", data.category_id);
      if (data.description) formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);
      try {
        setLoading(true)
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/products/owner`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        console.log("Success adding product", response.data);
        setData({
          name: "",
          description: "",
          price: "",
          category_id: "",
          image: null,
        });
        toast.success("Product added successfully");
        dispatch(fetchMenu())
        setLoading(false)
      } catch (e) {
        console.error(e);
        toast.error("Failed to add product. Please try again");
        setLoading(false)
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <Link
            to="/dashboard/products"
            className="border-[1px] p-3 hover:bg-main-secondary cursor-pointer  "
          >
            <ArrowLeft className=" w-6 h-6 text-main-primary  " />
          </Link>
          <div>
            <h1 className="text-[30px] leading-[30px] md:text-[30px] font-[600] ">
              Create Meal
            </h1>
            <span>List Meals</span>
          </div>
        </div>

        <Button className="">
          <span className="hidden md:block">Create Meal</span>
        </Button>
      </div>
      <div className="py-6">
        <form className="space-y-4 grid md:grid-cols-2 gap-[20px] items-start">
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2 relative">
              <Label className="">Meal Name</Label>
              <Input
                type="text"
                className={error.name && "border-red-500"}
                placeholder="Enter Meal Name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              {error.name && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
                  {error.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label className="">Meal Price</Label>
              <Input
                type="number"
                className={error.price && "border-red-500"}
                placeholder="Enter Meal Name"
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
              {error.price && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
                  {error.price}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="">Meal Description</Label>
              <textarea
                type="text"
                className="flex h-[150px] w-full rounded-[12px] border-[1px] bg-[#F4F7F9] px-3 py-2 text-base  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none md:text-sm"
                placeholder="Enter Meal Name"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Category</Label>
              <Select
                onValueChange={(e) => setData({ ...data, category_id: e })}
              >
                <SelectTrigger
                  className={error.category_id && "border-red-500"}
                >
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => {
                    return (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {error.category_id && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-14px]  text-red-500">
                  {error.category_id}
                </p>
              )}
            </div>
            <Button onClick={(e) => handelSubmite(e)}>
              {loading ? (
                <img src={loadingImg} width={30} alt="loading" />
              ) : (
                <span> Create Category</span>
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-[#F4F7F9] p-5 rounded-[10px] h-[250px] ">
              <h1 className=" text-[20px] font-[600] mb-3">upload images</h1>
              <div className="grid grid-cols-2  gap-3">
                <div>
                  <label
                    id="input-image"
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center w-full h-[150px] justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#EEEEEE]  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                        setData({ ...data, image: e.target.files[0] })
                      }
                    />
                  </label>

                  <div className="flex flex-col gap-2"></div>
                </div>
                <div>
                  {data.image && (
                    <div className=" border-2 border-[#F5CAAB] rounded-[10px] p-1  ">
                      <img
                        src={URL.createObjectURL(data.image)}
                        className="h-[150px] w-full rounded-[10px] cursor-pointer"
                        onClick={() => setImage(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
