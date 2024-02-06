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
    <div className=" mx-auto">
      <div className="relative h-[250px] w-[200px] xl:h-[480px] xl:w-[450px]">
        <Image
          src={selectedImage}
          alt={name}
          layout="fill"
          className="rounded-xl"
          priority
        />
      </div>
      <div className="  flex flex-col items-start xl:flex-row xl:items-center">
        {imageUrls.slice(0, 3).map((imageUrl, index) => (
          <div
            key={index}
            className="mr-[14px] mt-[14px]  cursor-pointer rounded-xl border-2 border-black/30 hover:mr-2 hover:mt-2 hover:border-4"
            onMouseOver={() => handleImageSelect(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={100}
              height={100}
              className=" h-[110px] w-[110px]  rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectImage;
