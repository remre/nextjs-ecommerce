import FormSubmitButton from "@/components/FormSubmit";
import { authOptions } from "@/lib/AuthOptions";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add-Product",
  metadataBase: "http://localhost:3000",
};

async function addProduct(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}
export default async function addProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <div>
      <h1 className="mb-3 text-xl font-bold"> Add Product</h1>
      <form action={addProduct}>
        <input
          className="input input-bordered mb-3 w-full"
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
          className="input input-bordered mb-3 w-full"
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
        />
        <input
          className="input input-bordered mb-3 w-full"
          required
          name="price"
          placeholder="Price"
          type="number"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
