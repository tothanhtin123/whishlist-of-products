import { Card, CardContent, CardTitle } from "@/shared/components/ui/card";
import React, { PropsWithChildren } from "react";

const AuthLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <main>
      <div className="min-h-screen flex items-center">
        <div className="container max-w-small">
          <Card className="px-2 py-6 lg:px-6">
            <CardContent className="mt-6">{props.children}</CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
