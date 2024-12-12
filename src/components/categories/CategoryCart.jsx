import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditeCategory from "./EditeCategory";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import { ToastContainer, toast } from "react-toastify";
// import EditeCategory from "./EditeCategory";

export default function CategoryCart({ category, index }) {
  const [OpenEdite, setOpenEdite] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const products = useSelector((state) => state.menu.products);

  const dispatch = useDispatch();

  const filterProduct = products?.filter(
    (product) => product.categoryId._id === category._id
  );

  const handleDelete = async () => {
    // delete category here
    try {
      // delete category from API here
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/categories/${category._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      console.log("Category deleted successfully", response.data);
      dispatch(fetchCategories());
      setOpenDelete(false);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
    }
  };

  return (
    <>
      <TableRow className="xl:text-[17px] text-[15px]]">
        <TableCell>#{index + 1}</TableCell>
        <TableCell>{category.name}</TableCell>
        <TableCell className="hidden md:table-cell">
          {filterProduct?.length} Meal
        </TableCell>
        <TableCell> {new Date(category.createdAt).toDateString()}</TableCell>
        <TableCell className="">
          <div className="md:flex md:gap-3 hidden md:block">
            <Button
              className="bg-[#76a963] "
              onClick={() => setOpenEdite(true)}
            >
              <Edit />
              <span className="">Edit</span>
            </Button>
            <Button
              className="bg-[#FDD8E0] text-[#F4164F] "
              onClick={() => setOpenDelete(true)}
            >
              <Trash2 />
              <span className="">Delete</span>
            </Button>
          </div>
          <DropdownMenu className="">
            <DropdownMenuTrigger className="md:hidden">
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="" onClick={() => setOpenEdite(true)}>
                <Edit className="text-[#76a963]" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="" onClick={() => setOpenDelete(true)}>
                <Trash2 className="text-[#F4164F]" />
                <span className="">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <Dialog open={OpenEdite} onOpenChange={setOpenEdite}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[600]">
              Create Category
            </DialogTitle>
            <div>
              <EditeCategory setOpenEdite={setOpenEdite} category={category} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="w-[90%] md:w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[500]">
              Delete category
            </DialogTitle>
            <div className="text-[16px]">
              Are you sure you want to delete this meal?
              <div className="flex gap-3 pt-3">
                <Button
                  className=" bg-[#FDD8E0] text-[#F4164F]"
                  onClick={() => handleDelete()}
                >
                  Delete
                </Button>
                <Button className="" onClick={() => setOpenDelete(false)}>
                  Cencele
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
