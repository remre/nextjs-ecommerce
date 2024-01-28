import { GetCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";

export const metadata = {
  title: "Your Cart- Flowamazon",
};

export default async function CartPage() {
  const cart = await GetCart();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => {
        return <CartEntry cartItem={cartItem} key={cartItem.id} />;
      })}
    </div>
  );
}
