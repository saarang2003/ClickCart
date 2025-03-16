import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'sonner';


const initialFormData = {
  status : "",
}

function AdminOrdersView({orderDetails}) {

  const [formdata , setFormData] = useState(initialFormData);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

    console.log(orderDetails , "orderDetailsorder");

    function handleUpdateStatus(event){
      event.preventDefault();
      const {status} = formdata;

      dispatch(
        updateOrderStatus({
          id : orderDetails?._id , orderStatus : status
        })
      ).then((data) =>{
        if(data?.payload?.success){
          dispatch(getOrderDetailsForAdmin(orderDetails._id));
          dispatch(getAllOrderForAdmin());
          setFormData(initialFormData)
        }
      })
    }

  return (
    <Card>
         <CardHeader>
           <CardTitle>All Orders</CardTitle>
         </CardHeader>
         <CardContent>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Order Id</TableHead>
                 <TableHead>Order Date</TableHead>
                 <TableHead>Order Status</TableHead>
                 <TableHead>Order Price</TableHead>
                 <TableHead>
                   <span className="sr-only">Details</span>
                 </TableHead>
               </TableRow>
             </TableHeader>
           </Table>
         </CardContent>
       </Card>
  )
}

export default AdminOrdersView