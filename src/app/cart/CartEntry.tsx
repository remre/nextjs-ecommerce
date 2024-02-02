"use client";
import { QuantitySelect } from "@/components/Quantity";
import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/Format";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}
export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imageUrl[1]}
            alt={product.name}
            height={200}
            width={200}
            className="h-[200px] w-[200px] rounded-lg "
          ></Image>
        </Link>

        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div>Price : {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <QuantitySelect
              productId={product.id}
              quantity={quantity}
              setProductQuantity={setProductQuantity}
            />
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className=" loading loading-spinner loading-sm"></span>
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
