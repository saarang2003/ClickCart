import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import AdminOrdersView from "../../components/admin-view/order";

function AdminOrders() {
  return (
   <div>
    <AdminOrdersView />
   </div>
  );
}

export default AdminOrders;
