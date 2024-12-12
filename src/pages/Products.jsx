"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  const products = useSelector((state) => state.menu.products)
  console.log(products)

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] leading-[0px] md:text-[30px] font-[600] ">
          List Meals
        </h1>
        <Button className="">
          <Link
            to="create-product"
            className="flex gap-1 items-center"
          >
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
            {products?.map((product) => {
              return <ProductCart product={product} key={product._id} />
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
