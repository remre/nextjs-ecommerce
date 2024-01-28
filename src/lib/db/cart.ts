import { cookies } from "next/dist/client/components/headers";

// not server actions
import { Cart, Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export type CartWithProduct = Prisma.CartGetPayload<{
  include: {
    items: { include: { product: true } };
  };
}>;
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProduct & {
  size: number;
  subtotal: number;
};

export async function GetCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: {
          items: { include: { product: true } },
        },
      })
    : null;

  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });
  // not well for production but ok for now
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
