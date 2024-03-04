import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { Button } from "@/shared/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/shared/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

type ProductItemProps = Product & {
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
};
const dummyPlaceholder = "/images/dummy/placeholder.png";
const ProductItem: React.FC<ProductItemProps> = (props) => {
  return (
    <li className="w-full md:w-[44.5%] lg:w-[33%] lg:px-4">
      <Card className="p-4">
        <div className="flex justify-end relative z-[20]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => props.onEditClick(props.id)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => props.onDeleteClick(props.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AspectRatio ratio={16 / 9} className="mt-2">
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
