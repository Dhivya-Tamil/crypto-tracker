import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import PriceToggle from "../components/Coin/TogglePriceTypes";
import SelectDays from "../components/Coin/SelectDays";
import Loader from "../components/Common/Loader";
import List from "../components/DashBoard/List";
import { coinObject } from "../functions/convertObject";
import { settingChartData } from "../functions/settingChartData";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import axios from "axios";


function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

 useEffect(()=>{
    if(id){
      getData();
    }
 },[id])


async function getData(){
  const data = await getCoinData(id);
  if(data){
    coinObject(setCoinData, data);
    const prices = await getCoinPrices(id, days,priceType);
    if(prices){
      console.log("wohooo");
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  } 
}

const handleDaysChange = async (event) =>{
  setIsLoading(true);
  setDays(event.target.value);
  const prices = await getCoinPrices(id, event.target.value,priceType);
  if(prices){
    settingChartData(setChartData, prices);
    setIsLoading(false);
  }
}
  
const handlePriceTypeChange = async(event, newType) =>{
  setIsLoading(true);
  setPriceType(newType);
  const prices = await getCoinPrices(id, days,newType);
  if(prices){
    settingChartData(setChartData, prices);
    setIsLoading(false);
  }
}

  return (
    <div>
      {isLoading ? 
      (
        <Loader/>
      ) : (
        <>
        <div className="grey-wrapper">
           <List coin={coinData} />
         </div>
         <div className="grey-wrapper">
           <SelectDays days={days} handleDaysChange={handleDaysChange} />
           <PriceToggle 
            priceType={priceType}
            handlePriceTypeChange={handlePriceTypeChange}
            />
           <LineChart chartData={chartData} priceType={priceType} />
         </div>
         <div className="grey-wrapper">
           <CoinInfo heading={coinData.name} desc={coinData.desc} />
         </div>
        </>
      )}
    </div>
  );
}

export default CoinPage;




























