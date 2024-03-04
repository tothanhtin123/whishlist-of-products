"use client";
import { deleteProductRequest, getProductsRequests } from "@/requests/product.request";
import { useToast } from "@/shared/components/ui/use-toast";
import { Product } from "@/types/product";
import React, { Fragment, useEffect, useState } from "react";
import ProductList from "./product-list";
import Paginate from "@/shared/components/ui/pagination/paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryParams } from "@/utils/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { ProductCategory } from "@/app/enums/product.enum";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/shared/components/ui/select";
import { SortOrder } from "@/app/enums/api-request.enum";
import { useAuthProvider } from "@/providers/auth.provider";
import ProductProfileFormModal from "./product-profile-form-modal";
import ProductConfirmDeleteModal from "./product-confirm-delete-modal";

const categoryFilterOptions: { label: string; value: ProductCategory }[] = [
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

const limit = 9;

type QueryData = {
  page: number;
  search?: string;
  filter?: string;
};

const formSchema = z.object({
  search: z.string().optional(),
  filter: z.string().optional(),
});

const ProductsSection = () => {
  const { toast } = useToast();
  const { user } = useAuthProvider();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [paginationMetaData, setPaginationMetaData] = useState<ApiPaginationMetaData>({
    limit: limit,
    page: 0,
    total: 0,
  });
  const [isOpenProfileForm, setIsOpenProfileForm] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const pageCount = Math.ceil(paginationMetaData.total / limit);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search,
      filter,
    },
  });

  const changeQuery = (queryData: QueryData) => {
    const newParams = createQueryParams(queryData, searchParams);
    router.replace(`${pathName}?${newParams.toString()}`);
  };

  const changePage = (pageNumber: number) => {
    // scroll to top when page change
    changeQuery({ page: pageNumber, search });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmitSearchForm: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    changeQuery({
      page: 1,
      search: values.search || "",
      filter: values.filter,
    });
  };

  const fetchProducts = async (queryData: QueryData) => {
    try {
      setIsLoading(true);
      // biome-ignore lint/complexity/noBannedTypes: <explanation>
      let filterParam: Object = {
        //get only products that user create
        createdById: user?.id,
      };

      if (queryData.filter) {
        filterParam = {
          ...filterParam,
          category: queryData.filter,
        };
      }

      const result = await getProductsRequests({
        limit,
        page: queryData.page,
        search: queryData.search,
        filter: JSON.stringify(filterParam),
        sort: JSON.stringify({ createdAt: SortOrder.DESC }),
      });
      setProducts(result.data.data);
      setPaginationMetaData(result.data.pagination);
    } catch (error: any) {
      toast({
        title: "Get an error when fetching products",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsInit(true);
    }
  };

  const changeIsOpenProductProfile = (value: boolean) => {
    setIsOpenProfileForm(value);
  };

  const changeIsOpenDeleteConfirm = (value: boolean) => {
    setIsOpenDeleteConfirm(value);
  };

  const handleItemEditClick = (id: string) => {
    setSelectedProductIndex(products.findIndex((item) => item.id === id));
    changeIsOpenProductProfile(true);
  };

  const handleItemDeleteClick = (id: string) => {
    setSelectedProductIndex(products.findIndex((item) => item.id === id));
    changeIsOpenDeleteConfirm(true);
  };

  const reFetchData = (queryData: QueryData) => {
    changeQuery(queryData);
    fetchProducts({ page: queryData.page, search: queryData.search, filter: queryData.filter });
  };

  const handleCreateProductSuccess = () => {
    changeIsOpenProductProfile(false);
    reFetchData({
      page: 1,
      search: "",
      filter: "",
    });
    //reset search input
    form.reset({
      search: "",
      filter: "",
    });
  };

  const handleUpdateProductSuccess = () => {
    changeIsOpenProductProfile(false);
    reFetchData({
      page,
      search,
      filter,
    });
    setSelectedProductIndex(-1);
  };

  const handleDeleteProduct = async () => {
    const product = products[selectedProductIndex];
    if (!product) return;
    try {
      const result = await deleteProductRequest(product.id);
      changeIsOpenDeleteConfirm(false);
      setSelectedProductIndex(-1);
      if (result.data.data) {
        reFetchData({
          page,
          search,
          filter,
        });
        toast({
          title: "Delete product successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Get an error when deleting the product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProducts({ page, search, filter });
  }, [page, search, filter]);

  if (!isInit) {
    return <Fragment />;
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-4 flex gap-x-4 gap-y-4 flex-col lg:flex-row">
          <div className="flex-1">
            <Form {...form}>
              <form
                className="flex gap-x-4 flex-wrap gap-y-4"
                onSubmit={form.handleSubmit(handleSubmitSearchForm)}
              >
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Product name" />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="filter"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={filter}>
                          <FormControl>
                            <SelectTrigger className="min-w-[150px]">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryFilterOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />

                <Button disabled={isLoading}>Search</Button>
              </form>
            </Form>
          </div>
          <div>
            <Button className="w-full lg:w-fit" onClick={() => changeIsOpenProductProfile(true)}>
              Create
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <ProductList
            onItemEditClick={handleItemEditClick}
            onItemDeleteClick={handleItemDeleteClick}
            products={products}
          />
        </div>
        <div>
          {products.length > 0 ? (
            <Paginate
              pageCount={pageCount}
              forcePage={Number(page) - 1}
              onPageChange={({ selected }) => {
                if (isLoading) return;
                changePage(selected + 1);
              }}
            />
          ) : null}
        </div>
      </div>

      <ProductProfileFormModal
        isOpen={isOpenProfileForm}
        defaultProduct={products[selectedProductIndex]}
        onOpenChange={changeIsOpenProductProfile}
        onCreateSuccess={handleCreateProductSuccess}
        onUpdateSuccess={handleUpdateProductSuccess}
      />
      <ProductConfirmDeleteModal
        onOpenChange={changeIsOpenDeleteConfirm}
        onCancel={() => changeIsOpenDeleteConfirm(false)}
        onConfirm={handleDeleteProduct}
        isOpen={isOpenDeleteConfirm}
      />
    </section>
  );
};

export default ProductsSection;
