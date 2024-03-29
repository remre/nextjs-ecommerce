import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import setProductQuantity from "./actions";
import { formatPrice } from "@/lib/Format";

export const metadata = {
  title: "Your Cart- Flowamazon",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="container px-2">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => {
        return (
          <CartEntry
            setProductQuantity={setProductQuantity}
            cartItem={cartItem}
            key={cartItem.id}
          />
        );
      })}
      {!cart?.items.length && <p>Empty cart</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total : {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]"> Checkout</button>
      </div>
    </div>
  );
}
