"use client";

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;

  incrementProductQuantity: (
    productId: string,
    quantity: number,
  ) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col items-center gap-2 space-y-2">
      <select
        className="select select-bordered flex w-full  items-center justify-center text-center"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.currentTarget.value))}
      >
        {[...Array(10)].map((_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary flex "
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId, quantity);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg> */}
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart.</span>
      )}
    </div>
  );
}
