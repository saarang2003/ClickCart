import React, { useState } from 'react'
import ProductFilter from '../../components/shopping-view/filter'

function ShoppingListing() {

  const [filter , setFilter] = useState({});

function handleFilter() {
  
}
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
         <ProductFilter filters={filter} handleFilter={handleFilter} />


    </div>
  )
}

export default ShoppingListing