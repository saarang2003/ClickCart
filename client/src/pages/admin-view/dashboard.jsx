import { ArrowUpRight, BadgeDollarSign, BellPlus, CalendarDays, ListOrdered, ShoppingCart, Truck } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin } from '../../store/admin/order-slice';
import Chart from '../../components/admin-view/Chart';

function AdminDashboard() {

  const {user} = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();


  useEffect(() =>{
    dispatch(getAllOrdersForAdmin());
  } , [dispatch])

  console.log("order Data" , orderList);
  // console.log("admin user" , user);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const cardData = () => {
    const statusCounts = {};
  
    orderList.forEach(({ orderStatus }) => {
      statusCounts[orderStatus] = (statusCounts[orderStatus] || 0) + 1;
    });
  
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  };
  console.log("cardlmd",cardData())
  


  const StatCard = ({ icon, title, value , count }) => {
    return (
      <div className='flex h-[100px] justify-around items-center p-6 border  shadow-md rounded-lg'>
        <div className='w-[50px] h-[50px] p-2 bg-gray-300/40 border shadow-md rounded-full flex justify-center items-center'>
          {icon}
        </div>
        <div className='flex justify-between items-center'>
  <p className='text-2xl'>{value}</p>
  <p className=' flex items-center gap-1'>
    <ArrowUpRight size={15} color='green' />
    ({count})
  </p>
</div>

      </div>
    );
  };
  const data01 = cardData();

  



  return (
    <>
<div className='min-h-screen mb-2 border-b rounded-2xl w-full p-6 border-2 shadow-md border-gray-300/40'>
<div className='flex justify-between'>
      <div className='flex flex-col h-full text-left'>
      <h1 className='text-4xl font-montserrat font-bold'>
      Hello {user.userName.charAt(0).toUpperCase() + user.userName.slice(1).toLowerCase()}
        </h1>
        <div className='text-foreground/60 text-sm'>
      Here's what's Happening With Your Store Today
    </div>
      </div>
      <div className='flex justify-between gap-3'>
    <p><CalendarDays /></p>
    <p className='font-bold'>{formattedDate}</p>
    <p className='cursor-pointer'><BellPlus /></p>
  </div>
</div>
<hr className='mt-4 border-1 border-gray-600/40' />



<div className='grid grid-cols-1 md :grid-cols-3 lg:grid-cols-4 gap-3 w-full p-4 '>
{/* <div className='flex h-[100px] justify-around items-center p-6 border-1 border-gray-800/40 shadow-md rounded-lg'>
<div className='w-[50px] h-[50px] p-2 bg-gray-300/40 border shadow-md rounded-full flex justify-center items-center '>
  <BadgeDollarSign />
</div>
  <div className='flex flex-col align-start gap-2'>
  <p className='font-bold'>Total Products</p>
  <p className='text-2xl'>250$</p>
  </div>
</div> */}
  <StatCard icon={<BadgeDollarSign />} title="Total Products" value="250$" count={"2.5%"} />
  <StatCard icon={<ShoppingCart />} title="Orders Today" value="18" count={"2.5% "}  />
  <StatCard icon={<Truck />} title="Pending Deliveries" value="5" count={"2.5%"}  />
  <StatCard icon={<ListOrdered />} title="Pending Orders" value="45" count={"2.5%"}  />
</div>

<div className='mt-3 max-h-fit mb-2 border-b rounded-2xl w-full p-6 border-2 shadow-sm border-gray-300/20'>
 <h3 className='font-bold text-2xl '>Your Sales Report </h3>
 <p className='text-left'>Have a Look at your Sale</p>
  <div className='flex justify-around p-4 gap-3 '>
    <div className='flex flex-col gap-3 items-center  mt-3' >
      <h1 className='text-5xl font-bold' > $4558.90</h1>
      <div className='flex text-left justify-center items-center gap-1'>
      <p><ArrowUpRight  size={20} color='green' /></p>
      <h3 className='text-green-600 '>$2339.5 (2.5%)</h3>

      </div>
    <div className='w-[400px] shadow-lg z-3'>
    <Chart data01={data01} />
  </div>
    </div>

  <div>
    Chart plot
  </div>
  </div>
</div>


</div>


</>
  )
}

export default AdminDashboard