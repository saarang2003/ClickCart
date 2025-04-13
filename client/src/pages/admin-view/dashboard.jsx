import { BadgeDollarSign, BellPlus, CalendarDays } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux'

function AdminDashboard() {

  const {user} = useSelector((state) => state.auth);
  console.log("admin user" , user);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });




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
<div className='flex h-[100px] justify-around items-center p-6 border-1 border-gray-800/40 shadow-md rounded-lg'>
<div className='w-[50px] h-[50px] p-2 bg-gray-300/40 border shadow-md rounded-full flex justify-center items-center '>
  <BadgeDollarSign />
</div>
  <div className='flex flex-col align-start gap-2'>
  <p className='font-bold'>Total Products</p>
  <p className='text-2xl'>250$</p>
  </div>
</div>

<div className='flex h-[100px] justify-around items-center p-6 border-1 border-gray-800/40 shadow-md rounded-lg'>
<div className='w-[50px] h-[50px] p-2 bg-gray-300/40 border  shadow-md rounded-full flex justify-center items-center '>
  <BadgeDollarSign />
</div>
  <div className='flex flex-col align-start gap-2'>
  <p className='font-bold'>Total Products</p>
  <p className='text-2xl'>250$</p>
  </div>
</div>


<div className='flex h-[100px] justify-around items-center p-6 border-1 border-gray-800/40 shadow-md rounded-lg'>
<div className='w-[50px] h-[50px] p-2 bg-gray-300/40 border shadow-md rounded-full flex justify-center items-center '>
  <BadgeDollarSign />
</div>
  <div className='flex flex-col align-start gap-2'>
  <p className='font-bold'>Total Products</p>
  <p className='text-2xl'>250$</p>
  </div>
</div>


<div className='flex h-[100px] justify-around items-center p-6 border-1 border-gray-800/40 shadow-md rounded-lg'>
<div className='w-[50px] h-[50px] p-2 bg-gray-300/40 border shadow-md rounded-full flex justify-center items-center '>
  <BadgeDollarSign />
</div>
  <div className='flex flex-col align-start gap-2'>
  <p className='font-bold'>Total Products</p>
  <p className='text-2xl'>250$</p>
  </div>
</div>
</div>


</div>


</>
  )
}

export default AdminDashboard