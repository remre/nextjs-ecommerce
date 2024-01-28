"use client";

import { formatPrice } from "@/lib/Format";
import { ShoppingCart } from "@/lib/db/cart";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropDown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost ">
        <div className="indicator">
          cartcart
          <span className="badge indicator-item badge-sm">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        className="card dropdown-content card-compact z-30 mt-3 w-52 bg-base-100 shadow"
        tabIndex={0}
      >
        <div className="card-body ">
          <span className="text-lg font-bold ">{cart?.size || 0} Items</span>
          <span className="text-info">
            Subtotal : {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className="card-action">
            <Link
              href="/cart"
              className="btn btn-primary btn-block"
              onClick={closeDropDown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
