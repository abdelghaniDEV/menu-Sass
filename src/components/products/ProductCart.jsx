import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import ViewProduct from "./ViewProduct";
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
import { Link } from "react-router";
import meal01 from "../../assets/meal01.webp";
import ViewProduct from "./ViewProduct";
import { Edit, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchMenu } from "../../redux/slices/menuSlice";

export default function ProductCart({ product }) {
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/owner/${product._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      console.log("Product deleted successfully", response.data);
      dispatch(fetchMenu())
      setOpenDelete(false)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <>
      <TableRow>
        <TableCell className="hidden md:table-cell">
          <img
            src={product?.image ? product?.image : meal01}
            className="rounded-full w-[45px] h-[45px]"
            alt="meal01"
          />
        </TableCell>
        {/* <TableCell>Product</TableCell> */}
        <TableCell>{product?.name}</TableCell>
        <TableCell>${product?.price}</TableCell>
        <TableCell>{product?.categoryId?.name}</TableCell>
        <TableCell className="hidden md:table-cell">{new Date(product?.createdAt).toDateString()}</TableCell>
        <TableCell>
          <div className="md:grid grid-cols-3 gap-3 hidden md:block">
            <Button className="hidden md:block bg-[#76a963] text-white rounded-[8px] p-2 text-center">
              <Link to={`edit/${product._id}`}>Edit</Link>
            </Button>
            <Dialog>
              <DialogTrigger className="hidden md:block bg-[#b58df2] text-white rounded-[8px] p-2 text-center ">
                view
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
                <ViewProduct product={product} />
              </DialogContent>
            </Dialog>
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
              <DialogTrigger className=" bg-[#FDD8E0] hidden md:block text-[#F4164F] md:rounded-[8px]  p-2 text-center">
                Delete
              </DialogTrigger>
              <DialogContent className="w-[90%] md:w-auto">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <p>
                  This action cannot be undone. This will permanently delete
                  this Meal and remove data from our servers.
                </p>
                <div className="flex gap-3">
                  <Button className=" bg-[#FDD8E0]  text-[#F4164F]  rounded-[8px]  p-2 text-center" onClick={() => handleDelete()}>
                    Delete
                  </Button>
                  <DialogTrigger className=" bg-main-primary  text-[white] rounded-[8px]  p-2 text-center">
                    {" "}
                    Close
                  </DialogTrigger>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <DropdownMenu className="">
            <DropdownMenuTrigger className="md:hidden">
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-5">
              <DropdownMenuLabel>{product?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="">
                <Link
                  to={`edit/${product._id}`}
                  className="flex gap-2 items-center"
                >
                  <Edit className="text-[#76a963]" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="">
                <Eye className="text-[#b58df2]" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className=""
                onClick={() => setOpenDelete(true)}
              >
                <Trash2 className="text-[#F4164F]" />
                <span className="">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
