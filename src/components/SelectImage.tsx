"use client";

// SelectImage.tsx
import { useState } from "react";
import Image from "next/image";

interface SelectImageProps {
  imageUrls: string[];
  name: string;
}

const SelectImage: React.FC<SelectImageProps> = ({ imageUrls, name }) => {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className=" mx-auto flex flex-row ">
      <div className=" flex  flex-col justify-end ">
        {imageUrls.slice(0, imageUrls.length).map((imageUrl, index) => (
          <div
            key={index}
            className=" mr-[14px] mt-[14px] scale-75 cursor-pointer  rounded-xl border-2 border-black/30 hover:mr-2.5 hover:mt-2.5 hover:border-4 lg:scale-100"
            onMouseOver={() => handleImageSelect(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={100}
              height={100}
              className=" h-[90px] w-[90px]  rounded-lg "
            />
          </div>
        ))}
      </div>
      <div className="relative flex h-[350px] w-[270px]  lg:h-[520px] lg:w-[460px]">
        <Image
          src={selectedImage}
          alt={name}
          layout="fill"
          className="rounded-xl"
          priority
        />
      </div>
    </div>
  );
};

export default SelectImage;
