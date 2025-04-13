import { BellPlus, CalendarDays } from 'lucide-react';
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


    <div className="flex justify-between min-h-screen mb-2 border-b rounded-2xl w-full p-6 border-2 shadow-md border-gray-300/40">
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


<div className="abstract-line-wrapper my-4">
  <div className="border-t-2 border-gray-600"></div>
</div>
</>
  )
}

export default AdminDashboard