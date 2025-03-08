import React, { useEffect, useState } from 'react'
import ProductFilter from '../../components/shopping-view/filter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import {Button} from '../../components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';
import { sortOptions } from '../../components/controls';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '../../store/shop/product-slice';

function ShoppingListing() {
    const dispatch = useDispatch();
    const {productList} = useSelector(state => state.shopProducts) ;
    

  const [filter , setFilter] = useState({});
  const [sort, setSort] = useState(null);
  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }


  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

useEffect(() => {
  if (sort !== null)
    dispatch(
      fetchAllFilteredProducts()
    );
}, [dispatch, sort]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
         <ProductFilter filters={filter} handleFilter={handleFilter} />
         <div className="bg-background w-full rounded-lg shadow-sm">
         <div className="p-4 border-b flex items-center justify-between">
         <h2 className="text-lg font-extrabold">All Products</h2>
         <div className="flex items-center gap-3">
         <span className="text-muted-foreground">
         13 Products
         </span>
         <DropdownMenu>
         <DropdownMenuTrigger asChild>
         <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
          {sortOptions.map((sortItem) => (
              <DropdownMenuRadioItem
              value={sortItem.id}
              key={sortItem.id}
            >
              {sortItem.label}
            </DropdownMenuRadioItem>
          ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
          </DropdownMenu>
         </div>
         </div>
         </div>

    </div>
  )
}

export default ShoppingListing