import AuthProvider from "@/providers/auth.provider";
import React from "react";

const WishListLayout = () => {
  return (
    <main className="min-h-screen">
      <AuthProvider>
        <div>123</div>
      </AuthProvider>
    </main>
  );
};

export default WishListLayout;
