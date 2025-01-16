"use client";
import { Button } from "@/components/ui/button";
import { HandPlatter, Plus } from "lucide-react";
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
import { Link } from "react-router";
import ProductCart from "../components/products/ProductCart";
import { useSelector } from "react-redux";

export default function Product() {
  const [openCreate, setOpenCreate] = useState(false);
  const products = useSelector((state) => state.menu.products);
  console.log(products);

  const EmptyState = () => {
    return (
      // <div className="text-center py-12 ">
      //   <div className="flex flex-col">
      //   <HandPlatter />
      //   <h1 className="text-[20px] font-[700]">No products found.</h1>
      //   <p className="text-[16px]">
      //     Add some products to start managing your menu.
      //   </p>
      //   </div>
      // </div>
      <TableRow>
        <TableCell colSpan={6} className="text-center py-10 ">
          <div className="flex flex-col items-center gap-4">
            <HandPlatter className="w-[50px] h-[50px]" />
            <h1 className="text-[20px] font-[700]">No Meals found.</h1>
            <p className="text-[16px]">
              Add some Meal to start managing your menu.
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  };

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

  const ProductList = ({ products }) => {
    return products?.map((product) => {
      return <ProductCart product={product} key={product._id} />;
    });
  };

  const handelListProducts = ({ products }) => {
    if (products === false) {
      return (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </>
      );
    }

    if (products.length === 0) {
      return <EmptyState />;
    }

    return <ProductList products={products} />;
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] leading-[0px] md:text-[30px] font-[600] ">
          List Meals
        </h1>
        <Button className="">
          <Link to="create-product" className="flex gap-1 items-center">
            <Plus />
            <span className="hidden md:block">Add Meal</span>
          </Link>
        </Button>
      </div>
      <div className="py-3">
        <Table className="border">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[18px]">
              <TableHead className="hidden md:table-cell">image</TableHead>
              {/* <TableHead>Product</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className=" ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="md:text-[16px] md:font-[500]">
            {/* {products?.map((product) => {
              return <ProductCart product={product} key={product._id} />
            })} */}
            {handelListProducts({ products })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
