import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import React from "react";

type ProductConfirmDeleteModalProps = {
  isOpen?: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const ProductConfirmDeleteModal: React.FC<ProductConfirmDeleteModalProps> = ({
  isOpen,
  onOpenChange,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        onOpenChange(value);
      }}
    >
      <DialogContent className="container max-w-small overflow-y-scroll max-h-[calc(100vh-64px)]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>Are you sure want to delete this product</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-x-6 gap-y-4">
          <Button className="w-full lg:w-[50%]" onClick={onCancel}>
            No
          </Button>
          <Button className="w-full lg:w-[50%]" variant={"destructive"} onClick={onConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductConfirmDeleteModal;
