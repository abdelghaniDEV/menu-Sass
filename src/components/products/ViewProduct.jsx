import React from "react";
import meal01 from "../../assets/meal01.webp";

export default function ViewProduct({ product }) {
  return (
    <div>
      <img
        src={meal01}
        alt="meals"
        className="w-full rounded-[20px] h-[300px]"
      />
      <div className="flex flex-col gap-0 p-5 ">
        <div className="text-[30px] font-[500] leading-[30px] text-end">
          <h1>$ {product?.price}</h1>
        </div>
        <div className="text-[25px] font-[500] leading-[30px]">
          <h1>{product?.name}</h1>
          <span className="text-[18px] font-[500] leading-[15px]">
            {product.categoryId.name}
          </span>
        </div>
        {product?.description && (
          <div className="text-[15px] pt-2">
            <p>
              {product?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
