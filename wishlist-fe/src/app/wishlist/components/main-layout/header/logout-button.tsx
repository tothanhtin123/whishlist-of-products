"use client";
import { appConfig } from "@/consts/app-config";
import { localAuthService } from "@/services/auth/local-auth";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const logout = () => {
    localAuthService.logout();
    router.replace(appConfig.loginPage);
  };
  const handleButtonClick = () => logout();
  return <Button onClick={handleButtonClick}>Logout</Button>;
};
export default LogoutButton;
