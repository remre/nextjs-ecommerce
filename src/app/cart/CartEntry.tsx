"use client";
import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}
export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.ImageUrl}
          alt={product.name}
          height={200}
          width={200}
          className="rounded-lg "
        ></Image>
      </div>
      <div className="divider" />
    </div>
  );
}
