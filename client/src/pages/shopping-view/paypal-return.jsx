import React, { useEffect } from 'react'
import { Card, CardHeader, CardTitle } from '../../components/ui/card';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { capturePayment } from '../../store/shop/order-slice';

function PaymentReturnPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('payerId');
    const orderId = params.get('orderId');


    useEffect(() =>{
        if(paymentId && payerId){
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

            dispatch(capturePayment({paymentId , orderId , payerId})).then(data =>{
                if(data?.payload?.success){
                    sessionStorage.removeItem('currentOrderId');
                    window.location.href ="/shop/payment-success";
                }
            }
        )
        }
    } , [paymentId , payerId , orderId]);

  return (
   <Card>
    <CardHeader>
        <CardTitle>Processing Payment...</CardTitle>
    </CardHeader>
   </Card>
  )
}

export default PaymentReturnPage