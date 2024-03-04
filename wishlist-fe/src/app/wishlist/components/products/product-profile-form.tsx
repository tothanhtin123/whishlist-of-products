import { ProductCategory, ProductType } from "@/app/enums/product.enum";
import { uploadSingleFileRequest } from "@/requests/file-storage.request";
import { createProductRequest, updateProductRequest } from "@/requests/product.request";
import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import Spinning from "@/shared/components/ui/spinning";
import { useToast } from "@/shared/components/ui/use-toast";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const categoryOptions: { label: string; value: ProductCategory }[] = [
  {
    value: ProductCategory.SOFTWARE,
    label: "Software",
  },
  {
    value: ProductCategory.CLOTHES,
    label: "Clothes",
  },
  {
    value: ProductCategory.DEVICE,
    label: "Device",
  },
];

const typeOptions: { label: string; value: ProductType; category: ProductCategory }[] = [
  {
    category: ProductCategory.SOFTWARE,
    label: "Game",
    value: ProductType.GAME,
  },
  {
    category: ProductCategory.SOFTWARE,
    label: "Study",
    value: ProductType.STUDY,
  },
  {
    category: ProductCategory.SOFTWARE,
    label: "Work",
    value: ProductType.WORK,
  },

  {
    category: ProductCategory.DEVICE,
    label: "Laptop",
    value: ProductType.LAPTOP,
  },
  {
    category: ProductCategory.DEVICE,
    label: "Smartphone",
    value: ProductType.SMARTPHONE,
  },
  {
    category: ProductCategory.DEVICE,
    label: "Tablet",
    value: ProductType.TABLET,
  },

  {
    category: ProductCategory.CLOTHES,
    label: "Hat",
    value: ProductType.HAT,
  },
  {
    category: ProductCategory.CLOTHES,
    label: "Pant",
    value: ProductType.PANT,
  },
  {
    category: ProductCategory.CLOTHES,
    label: "Shirt",
    value: ProductType.SHIRT,
  },
  {
    category: ProductCategory.CLOTHES,
    label: "Shoe",
    value: ProductType.SHOE,
  },
];

const formSchema = z.object({
  name: z.string().min(3).max(100),
  category: z.enum([ProductCategory.SOFTWARE, ProductCategory.DEVICE, ProductCategory.CLOTHES]),
  type: z.enum([
    ProductType.GAME,
    ProductType.HAT,
    ProductType.LAPTOP,
    ProductType.PANT,
    ProductType.SHIRT,
    ProductType.SHOE,
    ProductType.SMARTPHONE,
    ProductType.STUDY,
    ProductType.TABLET,
    ProductType.WORK,
  ]),
  price: z.coerce.number().min(1000),
  thumbnail: z.instanceof(File).optional(),
});

type ProductFormData = z.infer<typeof formSchema>;

type ProductProfileFormProps = {
  onCreateSuccess: () => void;
  onUpdateSuccess: () => void;
  defaultProduct?: Product;
};

const ProductProfileForm = ({
  onCreateSuccess,
  onUpdateSuccess,
  defaultProduct,
}: ProductProfileFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultProduct?.name,
      category: defaultProduct?.category,
      type: defaultProduct?.type,

      price: defaultProduct?.price || 0,

      thumbnail: undefined,
    },
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const uploadThumbnail = async (file: File) => {
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadSingleFileRequest(formData);
    return result.data.data;
  };

  const createNewProduct = async (values: ProductFormData) => {
    try {
      setIsLoading(true);
      let thumbnailId: string | undefined = undefined;
      if (values.thumbnail) {
        const storedFile = await uploadThumbnail(values.thumbnail);
        thumbnailId = storedFile.id;
      }
      const result = await (defaultProduct
        ? updateProductRequest(defaultProduct.id, { ...values, thumbnailId })
        : createProductRequest({ ...values, thumbnailId }));
      if (result.data.data.id) {
        toast({
          title: defaultProduct ? "Update product successfully" : "Create product successfully",
        });
        if (defaultProduct) {
          onUpdateSuccess();
        } else {
          onCreateSuccess();
        }
      }
    } catch (error: any) {
      toast({
        title: defaultProduct ? "Update product failed" : "Create product failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit: SubmitHandler<ProductFormData> = (values) => {
    createNewProduct(values);
  };

  const selectedCategory = form.watch("category") || defaultProduct?.category;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <h3 className="font-semibold uppercase text-center">
          {defaultProduct ? "Update Product" : "Create new Product"}
        </h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>price</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="price" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Select a category</FormLabel>
                <Select
                  defaultValue={defaultProduct?.category}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.resetField("type", {
                      keepDirty: false,
                      keepError: false,
                      keepTouched: false,
                    });
                    form.setValue("type", undefined as any);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions

                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Select a type</FormLabel>
                <Select defaultValue={defaultProduct?.type} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {typeOptions
                      .filter((item) => item.category === selectedCategory)
                      .map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field: { value, onChange, ...fieldProps } }) => {
            return (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    onChange={(event) => onChange(event.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {defaultProduct?.thumbnail ? (
          <div className="w-[50%]">
            <p className="text-sm">Current product thumbnail:</p>
            <AspectRatio ratio={16 / 9} className="mt-2">
              <Image
                src={defaultProduct.thumbnail.publicUrl}
                alt="product thumbnail"
                objectFit="cover"
                fill
              />
            </AspectRatio>
          </div>
        ) : null}

        <Button disabled={isLoading}>{isLoading ? <Spinning /> : "Submit"}</Button>
      </form>
    </Form>
  );
};
export default ProductProfileForm;
