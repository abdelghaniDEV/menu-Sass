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
import { Link, useParams } from "react-router";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchMenu } from "../../redux/slices/menuSlice";
import { ToastContainer, toast } from "react-toastify";
import leadingImg from "../../assets/loading.svg"


export default function EditeProduct() {
  const prams = useParams();
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category_id: "",
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category_id: "",
  });
  const [oldCategory, setOldCategory] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading , setLoading] = useState(false)
  const products = useSelector((state) => state.menu.products);
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch()

  const product = products?.find((product) => product._id === prams.productID);

  useEffect(() => {
    if (product) {
      setData({
        name: product?.name || "",
        price: product?.price || "",
        description: product?.description || "",
        category_id: product?.categoryId._id || "",
      });
      setPrevUrl(product?.image);
    }
  }, [prams, product]);

  useEffect(() => {
    const targetCategory = categories?.find(
      (category) => category._id === data.category_id
    );
    setOldCategory(targetCategory?.name);
  }, [data.category_id, product]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkData()) {
      let formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.price) formData.append("price", data.price);
      if (data.description) formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);
      if (data.category_id) formData.append("categoryId", data.category_id);

      try {
        setLoading(true)
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/products/owner/${prams.productID}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        console.log("sucessfully updated product", response.data);
        dispatch(fetchMenu())
        toast.success("sucessfully updated product")
        setLoading(false)
      } catch (err) {
        console.error("error updating product", err);
        toast.success("network error")
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
            to="/products"
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
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label className="">Meal Name</Label>
              <Input
                type="text"
                className=" border-gray-300  w-full"
                placeholder="Enter Meal Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="">Meal Price</Label>
              <Input
                type="number"
                className=" border-gray-300  w-full"
                placeholder="Enter Meal Name"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="">Meal Description</Label>
              <textarea
                type="text"
                className="flex h-[150px] w-full rounded-[12px] border-[1px] bg-[#F4F7F9] px-3 py-2 text-base  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none md:text-sm"
                placeholder="Enter Meal Name"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Select
                onValueChange={(e) => setData({ ...data, category_id: e })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={
                      oldCategory ? oldCategory : "Select a Category"
                    }
                  />
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
            </div>
            <Button onClick={(e) => handleSubmit(e)}>
              {loading ? (
                <img src={leadingImg} width={30} alt="loading" />
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
                  <div className=" border-2 border-[#F5CAAB] rounded-[10px] p-1 ">
                    <img
                      src={
                        data?.image ? URL.createObjectURL(data?.image) : prevUrl
                      }
                      className="h-[100px] w-full cursor-pointer"
                      // onClick={() => setImage(null)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
