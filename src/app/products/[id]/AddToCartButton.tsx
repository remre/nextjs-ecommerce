"use client";

import { useState, useTransition } from "react";
import { incrementProductQuality } from "./actions";
import { Span } from "next/dist/trace";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuality: (prodcutId: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  incrementProductQuality,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="btn-primary ml-3"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuality(productId);
            setSuccess(true);
          });
        }}
      >
        Add Click
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart</span>
      )}
    </div>
  );
}
