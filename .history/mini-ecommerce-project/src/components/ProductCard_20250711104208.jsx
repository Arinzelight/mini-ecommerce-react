/* eslint-disable prettier/prettier */
import { Button } from "@heroui/button";
import React from "react";
import { HeartIcon } from "./icons";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-xl"
          src={product.images?.[0]}
        />
        <Button
          isIconOnly
          aria-label="Like"
          className="absolute top-3 right-3  dark:bg-gray-800 rounded-full p-2 shadow hover:scale-105 transition-transform"
          color="danger"
        >
          <HeartIcon />
        </Button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.category?.name}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">${product.price}</span>
        </div>
      </div>
    </div>
  );
}
