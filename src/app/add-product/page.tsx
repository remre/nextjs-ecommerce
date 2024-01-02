import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add-Product",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const ImageUrl = formData.get("ImageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !ImageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      ImageUrl,
      price,
    },
  });

  redirect("/");
}
export default function addProductPage() {
  return (
    <div>
      <h1 className="mb- text-xl font-bold"> Add Product</h1>
      <form action={addProduct}>
        <input
          className="mb- input input-bordered w-full"
          required
          name="name"
          placeholder="Name"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full "
        />
        <input
          className="mb- input input-bordered w-full"
          required
          name="ImageUrl"
          placeholder="Image URL"
          type="url"
        />
        <input
          className="mb- input input-bordered w-full"
          required
          name="price"
          placeholder="Price"
          type="numbe"
        />
        <button type="submit" className="btn btn-primary btn-block">
          {" "}
          Add Product
        </button>
      </form>
    </div>
  );
}
