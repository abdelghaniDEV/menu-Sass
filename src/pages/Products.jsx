"use client";
import { Button } from "@/components/ui/button";
import { HandPlatter, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import Pagination from "../components/Pagination";

export default function Product() {
  const [openCreate, setOpenCreate] = useState(false);
  const products = useSelector((state) => state.menu.products);
  const [fetchProducts, setProducts] = useState([]);

  // Handle initial data setup and updates from Redux
  useEffect(() => {
    if (products?.length > 0) {
      setProducts(products.slice(0, 8)); // عرض أول 8 منتجات عند التحميل
    }
  }, [products]);

  // Empty state component
  const EmptyState = () => (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-10">
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

  // Skeleton loading row
  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="w-10 h-5 bg-gray-200 animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="w-[200px] h-5 bg-gray-200 animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="w-[100px] h-5 bg-gray-200 animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="w-[200px] h-5 bg-gray-200 animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="w-[200px] h-5 bg-gray-200 animate-pulse" />
      </TableCell>
    </TableRow>
  );

  // Render product rows or empty state
  const renderProductRows = () => {
    if (!fetchProducts) {
      return Array.from({ length: 10 }).map((_, index) => (
        <SkeletonRow key={index} />
      ));
    }

    if (fetchProducts.length === 0) {
      return <EmptyState />;
    }

    return fetchProducts.map((product) => (
      <ProductCart product={product} key={product._id} />
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] leading-[0px] md:text-[30px] font-[600]">
          List Meals
        </h1>
        <Button>
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
              <TableHead className="hidden md:table-cell">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="md:text-[16px] md:font-[500]">
            {renderProductRows()}
          </TableBody>
        </Table>
      </div>

      <Pagination data={products} setData={setProducts} itemsPerPage={8} />
    </div>
  );
}
