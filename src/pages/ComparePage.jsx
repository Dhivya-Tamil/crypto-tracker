import React, { useEffect, useState } from 'react'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays';
import { getCoinData } from '../functions/getCoinData';
import { coinObject } from '../functions/convertObject';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartData';
import Loader from '../components/Common/Loader';
import { get100Coins } from '../functions/get100Coins';
import List from '../components/DashBoard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import LineChart from '../components/Coin/LineChart';
import TogglePriceTypes from '../components/Coin/TogglePriceTypes';

function ComparePage() {
 const[crypto1,setCrypto1] = useState("bitcoin");
 const[crypto2,setCrypto2] = useState("ethereum");
 const[days,setDays] = useState(30);
 const[crypto1Data,setCrypto1Data] = useState({});
 const[crypto2Data,setCrypto2Data] = useState({});
 const[isLoading,setIsLoading] = useState(true);
 const[priceType,setPriceType] = useState("prices");
 const[chartData,setChartData] = useState({});

 async function handleDaysChange(event){
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);  
    settingChartData(setChartData, prices1,  prices2);
 }

 const handlePriceTypeChange = async (event,newType) => {
  setPriceType(newType);
  const prices1 = await getCoinPrices(crypto1, days, newType);
  const prices2 = await getCoinPrices(crypto2, days, newType);  
  settingChartData(setChartData, prices1,  prices2);
};


    useEffect(()=>{
        getData();
    },[])

    async function getData(){
        setIsLoading(true)
        const data1 = await getCoinData(crypto1);
        
        if (data1) {
          const data2 = await getCoinData(crypto2);
            coinObject(setCrypto1Data, data1);   
        
        if (data2) {
            coinObject(setCrypto2Data, data2);       
           
          
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);  
                settingChartData(setChartData, prices1,  prices2);
              console.log("Both prices",prices1,prices2)
              setIsLoading(false); 
              }  
             
          }
    }

 const handleCoinChange  = async (event,isCoin2) =>{
    if(isCoin2){
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto2Data, data); 
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);   
        settingChartData(setChartData, prices1,  prices2);
      
    }
    else{
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto1Data, data); 
    }
   
    
   };
  

  return (
    <div>
        {isLoading ? (
            <Loader/>
        ) : (
          <>
        <div className='coins-days-flex'>
        <SelectCoins 
            crypto1={crypto1}
            crypto2={crypto2}
            handleCoinChange={handleCoinChange}
        />
        <SelectDays 
         days={days} 
         handleDaysChange={handleDaysChange}
         noPTag={true}
         />
        </div>
        <div className="grey-wrapper">
            <List coin={crypto1Data}/>
          </div>
          <div className="grey-wrapper">
            <List coin={crypto2Data} />
          </div>
          <div className="grey-wrapper">
          <TogglePriceTypes
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart chartData={chartData} 
             priceType={priceType} 
             multiAxis={true}/>
          </div>
          <CoinInfo name={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo name={crypto2Data.name} desc={crypto2Data.desc} />
        </>
        )}
    </div>
    
  )
}

export default ComparePage