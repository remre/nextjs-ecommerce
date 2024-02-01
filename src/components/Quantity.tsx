"use client";
import setProductQuantity from "@/app/cart/actions";
import React from "react";
import { useTransition } from "react";

interface QuantitySelectProps {
  productId: string;
  quantity: number;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export function QuantitySelect({
  productId,
  quantity,
  setProductQuantity,
}: QuantitySelectProps) {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return (
    <select
      className="select select-bordered w-full max-w-[80px]"
      defaultValue={quantity}
      onChange={(e) => {
        const newQuantity = parseInt(e.currentTarget.value);
        startTransition(async () => {
          await setProductQuantity(productId, newQuantity);
        });
      }}
    >
      <option value={0}>0 (Remove)</option>
      {quantityOptions}
    </select>
  );
}
