import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
import SelectImage from "@/components/SelectImage";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  // console.log("product", { product });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + " - retrommerce",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl[0] }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="container mx-auto flex flex-col space-x-10 xl:flex-row">
      <div className="flex items-start justify-start">
        <SelectImage imageUrls={product.imageUrl} name={product.name} />
      </div>
      <div className="mt-10 flex flex-col xl:basis-2/5">
        <h1 className="text-xl font-bold"> {product.name}</h1>
        <p>{product.description}</p>
        <PriceTag
          price={product.price}
          className="mt-3 h-10 text-xl  font-semibold"
        ></PriceTag>
      </div>
      <div className=" mt-2 box-border flex flex-col items-center justify-center gap-10  border-2 px-6 shadow-sm">
        <div>Free Delivery</div>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        ></AddToCartButton>
      </div>
    </div>
  );
}
