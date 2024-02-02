"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { prisma } from "@/lib/db/prisma";

export default async function MainSwiper() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    take: 1,
  });
  return (
    <div className="">
      <Swiper navigation={true} modules={[Navigation]} className="">
        <SwiperSlide>
          <Image
            src={products[0].imageUrl[0]}
            alt={products[0].name}
            width={500}
            height={500}
            className="rounded-xl"
            priority
          />
        </SwiperSlide>
      </Swiper>
      {/* <div className="hero-content flex-col items-start  lg:flex-row">
              <Image
                src={products[0].imageUrl[0]}
                alt={products[0].name}
                width={400}
                height={1200}
                className="h-[400px] w-[500px] max-w-sm rounded-lg shadow-2xl"
                priority
              />
              <div>
                <h1 className="text-5xl font-bold ">{products[0].name}</h1>
                <p className="py-6 ">{products[0].description}</p>
                <Link
                  href={`/products/${products[0].id}`}
                  className="btn btn-primary"
                >
                  Check it out
                </Link>
              </div>
            </div> */}
    </div>
  );
}
