import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { Card, CardDescription, CardTitle } from "@/shared/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";

type ProductItemProps = Product & {};
const dummyPlaceholder = "/images/dummy/placeholder.png";
const ProductItem: React.FC<ProductItemProps> = (props) => {
  return (
    <li className="w-full md:w-[44.5%] lg:w-[33%] lg:px-4">
      <Card className="p-4">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={props.thumbnail?.publicUrl || dummyPlaceholder}
            alt="product thumbnail"
            fill
            className="object-cover"
          />
        </AspectRatio>

        <CardTitle className="mt-4">{props.name}</CardTitle>
        <CardDescription className="mt-2">Price: {props.price}</CardDescription>
        <CardDescription className="mt-2">
          Category: {props.category} - Type: {props.type}
        </CardDescription>
      </Card>
    </li>
  );
};

export default ProductItem;
