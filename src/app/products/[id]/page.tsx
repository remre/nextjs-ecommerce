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
    <div className="container mx-2 flex flex-col  gap-4 gap-x-2 lg:mx-auto lg:flex-row xl:items-start">
      <div className="mx-2 flex flex-col  items-start  justify-start xl:flex-row">
        <SelectImage
          imageUrls={product.imageUrl}
          name={product.name}
        ></SelectImage>

        <div className="mx-2  items-start justify-start text-start">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name} </h1>

            <p className=" py-6">{product.description} </p>
            <PriceTag
              price={product.price}
              className="mt-6  text-2xl font-bold"
            ></PriceTag>
          </div>
        </div>
      </div>
      <div className="mx-2 box-border flex flex-col  space-y-4 border-2 p-4 xl:mx-auto  xl:items-center">
        <div>Free Delivery</div>
        <div className="flex">
          <AddToCartButton
            productId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          ></AddToCartButton>
        </div>
      </div>
    </div>
  );
}
