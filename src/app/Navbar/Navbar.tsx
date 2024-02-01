import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/autOptions";

// backyupauth

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <div className="container mx-auto justify-between">
      <div className="navbar mt-5 max-w-7xl flex-col justify-between gap-2 sm:flex-row">
        <div className="">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="flowmazon logo" />
            FlowAmazon
          </Link>
        </div>
        <div className="flex gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                className="input input-bordered w-full min-w-[100px]"
                placeholder="Search"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
