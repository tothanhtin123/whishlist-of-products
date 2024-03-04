import { appConfig } from "@/consts/app-config";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(appConfig.loginPage);
}
