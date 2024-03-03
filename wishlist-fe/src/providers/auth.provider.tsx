"use client";
import { appConfig } from "@/consts/app-config";
import { verifyAccessTokenRequest } from "@/requests/auth.request";
import { localAuthService } from "@/services/auth/local-auth";
import Spinning from "@/shared/components/ui/spinning";
import { useToast } from "@/shared/components/ui/use-toast";
import { cn } from "@/shared/utils/string";
import { User } from "@/types/user";
import { useRouter, usePathname } from "next/navigation";
import React, {
  Fragment,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user?: User;
}

const AuthContext = createContext<IAuthContext>({});

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const { toast } = useToast();
  const router = useRouter();
  const pathName = usePathname();
  const verifyAccessToken = async () => {
    try {
      const result = await verifyAccessTokenRequest();
      setUser(result.data.data);
      //redirect to wishlist if user already logins
      if ([appConfig.loginPage, appConfig.registerPage].includes(pathName)) {
        router.push(appConfig.wishlistPage);
      }
    } catch (error) {
      //redirect to login if user access wishlist without authentication
      if (![appConfig.loginPage, appConfig.registerPage].includes(pathName)) {
        toast({
          title: "Can not access your wishlist",
          description: "Your session is expired, please login again",
          variant: "destructive",
        });
        router.push(appConfig.loginPage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAccessToken();
  }, []);

  if (isLoading) {
    return (
      <Fragment>
        <div className="w-full h-screen flex justify-center items-center">
          <Spinning spinningClassName={cn("w-10 h-10")} />
        </div>
      </Fragment>
    );
  }

  return <AuthContext.Provider value={{ user }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;

const useAuthProvider = () => useContext(AuthContext);

export { AuthProvider, useAuthProvider };
