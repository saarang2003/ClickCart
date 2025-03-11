import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../ui/badge";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";

function ShoppingOrders() {
  const [openDetailsDialog , setOpenDetailDialog] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {orderList , orderDetails} = useSelector((state) =>state.shopOrders)



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
            ? orderList.map((orderItem) =>(
              <TableRow>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                  className={`py-1 px-3 ${
                    orderItem?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderItem?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                  >
                    {orderItem?.orderStatus }
                  </Badge>
                </TableCell>
                <TableCell>${orderItem?.totalAmount}</TableCell>
                <TableCell>${orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Dialog
                  open = {openDetailsDialog}
                  onOpenChange={() =>{
                    setOpenDetailDialog(false);
                    dispatch(resetOrderDetails());
                  }}
                  >
                    <Button
                    onClick={() =>
                      handleFetchOrderDetails(orderItem?._id)
                    }
                    >
                      View Details
                    </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
            :null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
