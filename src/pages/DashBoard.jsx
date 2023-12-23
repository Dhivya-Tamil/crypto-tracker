import React, { useEffect, useState } from 'react'
import TabsComponent from '../components/DashBoard/Tabs'
import axios from 'axios';
import Search from '../components/DashBoard/Search';
import PaginationComponent from '../components/DashBoard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';

function DashBoard() {
  const[paginatedcoins,setPaginatedcoins] = useState([]);
  const[coins,setCoins] = useState([]);
  const[search,setSearch] = useState("");
  const [page, setPage] = useState(1);
  const[isLoading,setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedcoins(coins.slice(previousIndex,previousIndex + 10))
  };

  const onSearchChange = (e) =>{
    setSearch(e.target.value);
  }

  var filteredCoins = coins.filter((item)=> {
    return item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())
  });

  useEffect(()=>{
    getData();
  },[])

  const getData = async () =>{
    const myCoins = await get100Coins();
    if(myCoins){
      setCoins(myCoins)
      setPaginatedcoins(myCoins.slice(0, 10))
      setIsLoading(false)
    }
   }

  return (
    <>
      <BackToTop />
      {isLoading ? ( 
      <Loader />
      ) : (
        <div>
       <Search search={search} onSearchChange={onSearchChange}/>
       <TabsComponent coins={search ? filteredCoins : paginatedcoins} />
       {!search && (
         <PaginationComponent page={page} handlePageChange={handlePageChange}/>
       )}
   </div>
      )
       
      }
    </>
  )
}

export default DashBoard