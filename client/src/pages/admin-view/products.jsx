import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {toast} from 'sonner';
import { addProductFormElements } from "../../components/controls/index";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};


function AdminProduct(){
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
  useState(false);
const [formData, setFormData] = useState(initialFormData);
const dispatch = useDispatch();


return (
  <Fragment>
    <div className="mb-5 w-full flex justify-end">
      <Button onClick={() => setOpenCreateProductsDialog(true)}>
        Add New Product
      </Button>
    </div>
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {addProductFormElements && addProductFormElements.length > 0
        ? addProductFormElements.map((productItem) => (
            <div key={productItem.id} className="flex flex-col gap-2"
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              // setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              // handleDelete={handleDelete}
            />
          ))
        : null}
    </div>
    <Sheet
      open={openCreateProductsDialog}
      onOpenChange={() => {
        setOpenCreateProductsDialog(false);
        // setCurrentEditedId(null);
        setFormData(initialFormData);
      }}
    >
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>
            Add Product
          </SheetTitle>
        </SheetHeader>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isEditMode={currentEditedId !== null}
        />
        <div className="py-6">
          <CommonForm
            // onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText="add"
            formControls={addProductFormElements}
            // isBtnDisabled={!isFormValid()}
          />
        </div>
      </SheetContent>
    </Sheet>
  </Fragment>
);

}


export default AdminProduct;