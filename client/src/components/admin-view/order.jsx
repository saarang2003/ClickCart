import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'

function AdminOrdersView() {
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