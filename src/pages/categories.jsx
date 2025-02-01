import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Plus } from "lucide-react";
import CategoryCart from "../components/categories/CategoryCart";
import CreateCategory from "../components/categories/CreateCategory";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function Categories() {
  const [openCreate, setOpenCreate] = useState(false);
  const categories = useSelector((state) => state.categories);

  
  const SkeletonRow = () => {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className="w-10 h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[200px] h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[100px] h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[200px] h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[200px] h-5" />
        </TableCell>
      </TableRow>
    );
  };

  const EmptyState = () => {
    return (
      <TableRow>
      <TableCell colSpan={5} className="text-center py-10 ">
        <div className="flex flex-col items-center gap-4">
          <LayoutDashboard className="w-[50px] h-[50px]" />
          <h1 className="text-[20px] font-[700]">No Category found.</h1>
          <p className="text-[16px]">
            Add some Category to start managing your menu.
          </p>
        </div>
      </TableCell>
    </TableRow>
    );
  };


  // list categories 
  const CategoryList = ({ categories }) => {
    return categories.map((category, index) => (
      <CategoryCart key={category._id} category={category} index={index} />
    ));
  };

  // handel fetch data 
  const handelListCategories = ({ categories }) => {
    if (categories === false) { 
      return (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </>
      );
    }
  
    if (categories.length === 0) {
     
      return <EmptyState />;
    }
  
    
    return <CategoryList categories={categories} />;
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h1 className="text-[25px] leading-[0px] md:text-[30px] font-[600] ">
          List Categories
        </h1>
        <Button
          className="flex gap-1 items-center"
          onClick={() => setOpenCreate(true)}
        >
          <Plus />
          <span className="hidden md:block">Create Category</span>
        </Button>
      </div>
      <div className="mt-5">
        <Table className="border ">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[18px]">
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Meals</TableHead>
              <TableHead className=" ">Date</TableHead>
              <TableHead className=" ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {handelListCategories({categories})}
            
          </TableBody>
        </Table>
      </div>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-[600]">
              Create Category
            </DialogTitle>
            <div>
              <CreateCategory setOpenCreate={setOpenCreate} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
