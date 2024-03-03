import AuthProvider from "@/providers/auth.provider";
import React from "react";
import MainLayout from "./components/main-layout/main-layout";
import ProductsSection from "./components/products/products-section";

const WishListLayout = () => {
  return (
    <AuthProvider>
      <MainLayout>
        <ProductsSection />
      </MainLayout>
    </AuthProvider>
  );
};

export default WishListLayout;
