import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import React from "react";
import ProductProfileForm from "./product-profile-form";
import { Product } from "@/types/product";

type ProductProfileFormModalProps = {
  isOpen?: boolean;
  onOpenChange: (value: boolean) => void;
  onCreateSuccess: () => void;
  onUpdateSuccess: () => void;
  defaultProduct?: Product;
};

const ProductProfileFormModal: React.FC<ProductProfileFormModalProps> = ({
  isOpen,
  onOpenChange,
  onCreateSuccess,
  onUpdateSuccess,
  defaultProduct,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        onOpenChange(value);
      }}
    >
      <DialogContent className="container max-w-small overflow-y-scroll max-h-[calc(100vh-64px)]">
        {isOpen ? (
          <div>
            <ProductProfileForm
              defaultProduct={defaultProduct}
              onCreateSuccess={onCreateSuccess}
              onUpdateSuccess={onUpdateSuccess}
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ProductProfileFormModal;
