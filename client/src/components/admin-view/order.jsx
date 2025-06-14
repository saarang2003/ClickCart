/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '../../store/admin/order-slice/index';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import AdminOrderDetailsView from './order-details';
import { Dialog } from '../ui/dialog';

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Track which order's details to show
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(orderId) {
    dispatch(getOrderDetailsForAdmin(orderId));
    setSelectedOrderId(orderId);
    setOpenDetailsDialog(true); // Open dialog when details are fetched
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
  };

  function getStatusBadgeColor(status) {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "rejected":
        return "bg-red-600";
      case "pending":
        return "bg-orange-500";
      case "inShipping":
        return "bg-blue-600";
      case "delivered":
        return "bg-green-700";
      default:
        return "bg-gray-500";
    }
  }

  console.log("Full order list:", orderList.map((item , ind) =>{
    {item?.orderStatus}
  }));

  console.log("Full order list:", orderList);

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

          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem._id}</TableCell>
                    <TableCell>{orderItem.orderDate.split('T')[0]}</TableCell>
                    <TableCell>
                      {/* <Badge
                        className={`py-1 px-3 ${
                          orderItem.orderStatus === 'confirmed'
                            ? 'bg-green-500'
                            : orderItem.orderStatus === 'rejected'
                            ? 'bg-red-600'
                            : 'bg-black'
                        }`}
                      >
                        {orderItem.orderStatus}
                      </Badge> */}


<Badge className={`py-1 px-3 text-white capitalize ${getStatusBadgeColor(orderItem?.orderStatus)}`}>
  {orderItem?.orderStatus }
</Badge>
                    </TableCell>
                    <TableCell>${orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null }
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog to show order details */}
      <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
        {selectedOrderId && (
          <AdminOrderDetailsView orderDetails={orderDetails} />
        )}
      </Dialog>
    </Card>
  );
}

export default AdminOrdersView;
