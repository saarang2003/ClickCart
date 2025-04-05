import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { capturePayment } from '../../store/shop/order-slice';

function PaymentReturnPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(true);
    
    useEffect(() => {
        async function handlePayment() {
            try {
                const params = new URLSearchParams(window.location.search);
                const paypalOrderId = params.get('token'); // ← the PayPal Order ID
                const payerId = params.get('PayerID');
                const orderId = params.get('orderId') || JSON.parse(sessionStorage.getItem('currentOrderId'));
                
                console.log("Payment details:", { paypalOrderId, payerId, orderId });
                
                if (!paypalOrderId || !payerId || !orderId) {
                    throw new Error("Missing payment information");
                }
                
                const result = await dispatch(capturePayment({
                    paypalOrderId, 
                    payerId, 
                    orderId
                })).unwrap();
                
                console.log("Payment capture result:", result);
                
                if (result.success) {
                    // Clear the order ID from session storage
                    sessionStorage.removeItem('currentOrderId');
                    // Redirect to success page
                    navigate("/shop/paypal-success");
                } else {
                    throw new Error(result.message || "Payment capture failed");
                }
            } catch (error) {
                console.error("Payment processing error:", error);
                setError(error.message || "Failed to process payment");
                setProcessing(false);
            }
        }
        
        handlePayment();
    }, [dispatch, location.search, navigate]);


    useEffect(() => {
        console.log("Redirected URL:", window.location.href);
      }, []);

    return (
        <Card className="max-w-md mx-auto my-8">
            <CardHeader>
                <CardTitle>{processing ? "Processing Payment..." : "Payment Status"}</CardTitle>
            </CardHeader>
            <CardContent>
                {error ? (
                    <div className="text-red-500">
                        <p>Error: {error}</p>
                        <p className="mt-4">Please contact customer support if your payment was processed.</p>
                    </div>
                ) : (
                    <p>Please wait while we process your payment. Do not close this window.</p>
                )}
            </CardContent>
        </Card>
    );
}

export default PaymentReturnPage;