import React, { useEffect, useState } from "react";
import img from '../../assets/account.jpg';
import UserCartItemsContent from "../../components/shopping-view/cart-items-wrapper";
import { createNewOrder } from '../../store/shop/order-slice/index';
import Address from '../../components/shopping-view/address';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'sonner';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

function Message({ content }) {
  return <p dangerouslySetInnerHTML={{ __html: content }} />;
}

function ShoppingCheckout() {
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const { approvalURL, orderId } = useSelector((state) => state.shopOrder);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const initialOptions = {
      "client-id": "ASZVY1BZywDrfihtmQJ5ircCE4Qvvz4L94GyksMn8rhrxSJMdRwxt17i4hzOKyOEGPilNlpndIpOQHWS",
      "enable-funding": "venmo",
      "disable-funding": "",
      "buyer-country": "US",
      "currency": "USD",
      "components": "buttons",
    };

    // Calculate total without the *10 error
    const totalCartAmount =
      cartItems && cartItems.items && cartItems.items.length > 0
        ? cartItems.items.reduce(
            (sum, currentItem) =>
              sum +
              (currentItem?.salePrice > 0
                ? currentItem?.salePrice
                : currentItem?.price) *
                currentItem?.quantity,
            0
          )
        : 0;

    function handleInitiatePaypalPayment() {
      if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
        toast("Your cart is empty. Please add items to proceed");
        return false;
      }
      
      if (currentSelectedAddress === null) {
        toast("Please select one address to proceed.");
        return false;
      }
      
      return true;
    }

    const createOrder = async () => {
      // First check if we can proceed
      if (!handleInitiatePaypalPayment()) {
        return null;
      }

      setIsLoading(true);
      
      try {
        const orderData = {
          userId: user?.id,
          cartId: cartItems?._id,
          cartItems: cartItems.items.map((singleCartItem) => ({
            productId: singleCartItem?.productId,
            title: singleCartItem?.title,
            image: singleCartItem?.image,
            price:
              singleCartItem?.salePrice > 0
                ? singleCartItem?.salePrice
                : singleCartItem?.price,
            quantity: singleCartItem?.quantity,
          })),
          addressInfo: {
            addressId: currentSelectedAddress?._id,
            address: currentSelectedAddress?.address,
            city: currentSelectedAddress?.city,
            pincode: currentSelectedAddress?.pincode,
            phone: currentSelectedAddress?.phone,
            notes: currentSelectedAddress?.notes,
          },
          orderStatus: "pending",
          paymentMethod: "paypal",
          paymentStatus: "pending",
          totalAmount: totalCartAmount,
          orderDate: new Date(),
          orderUpdateDate: new Date(),
        };

        const result = await dispatch(createNewOrder(orderData)).unwrap();
        console.log("Order creation result:", result);
        
        if (result.success) {
          // Return the orderId from your backend
          return result.orderId;
        } else {
          toast("Failed to create order: " + (result.message || "Unknown error"));
          return null;
        }
      } catch (error) {
        console.error("Order creation error:", error);
        toast("Error creating order: " + (error.message || "Unknown error"));
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    const onApprove = async (data, actions) => {
      try {
        setMessage("Processing payment...");
        console.log("Payment approved:", data);
        console.log("Order ID from state:", orderId);
        
        // Redirect to your return page with the payment information
        window.location.href = `/shop/payment-return?paymentId=${data.paymentID}&payerId=${data.payerID}&orderId=${orderId}`;
      } catch (error) {
        console.error("Payment approval error:", error);
        setMessage(`Transaction failed. Error: ${error.message}`);
      }
    };

    useEffect(() => {
      if (approvalURL) {
        window.location.href = approvalURL;
      }
    }, [approvalURL]);

    return (
      <div className="flex flex-col">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img src={img} className="h-full w-full object-cover object-center" alt="Header" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item, ind) => (
                  <UserCartItemsContent key={ind} cartItem={item} />
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  style={{ shape: "rect", layout: "vertical", color: "gold", label: "paypal" }}
                  disabled={isLoading}
                />
              </PayPalScriptProvider>
              {message && <Message content={message} />}
            </div>
          </div>
        </div>
      </div>
    );
}

export default ShoppingCheckout;