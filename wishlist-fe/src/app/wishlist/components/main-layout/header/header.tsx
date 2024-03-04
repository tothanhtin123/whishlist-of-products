import React from "react";
import LogoutButton from "./logout-button";
import { useAuthProvider } from "@/providers/auth.provider";

const Header = () => {
  const { user } = useAuthProvider();
  return (
    <header className="fixed z-10 w-full left-0 top-0 bg-secondary px-4">
      <div className="h-[64px] flex items-center max-w-standard mx-auto py-4">
        <p>Hello, {user?.fullName}</p>
        <div className="ml-auto mr-0">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
