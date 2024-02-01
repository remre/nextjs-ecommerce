import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

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
    title: product.name + " - flowmazon",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="container mx-2 flex flex-col  items-start  justify-start gap-4 gap-x-2 lg:mx-auto lg:flex-row xl:items-start">
      <div className="mx-2 flex flex-col  xl:flex-row">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-xl"
          priority
        />
        <div className="mx-2">
          <h1 className="text-5xl font-bold">{product.name} </h1>
          <PriceTag price={product.price} className="mt-6"></PriceTag>
          <p className="py-6">{product.description} </p>
        </div>
      </div>
      <div className="mx-2 box-border flex h-full w-[200px] flex-col  space-y-4 border-2 p-4 lg:mx-auto  lg:items-center">
        <div>in stock</div>
        <div>some unneccaasry information</div>
        <div className="">
          <AddToCartButton
            productId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          ></AddToCartButton>
        </div>
      </div>
    </div>
  );
}
