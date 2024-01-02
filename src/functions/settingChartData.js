import convertDate from "./convertDate";

export const settingChartData = (setChartData,prices1,prices2) =>{
 
    if(prices2){
      setChartData({
      labels: prices1.map((price) => convertDate(price[0])),
      datasets: [
        {
          label: "Crypto1",
          data: prices1.map((price) => price[1]),
          borderColor: "#fc950e",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          pointRadius: 0.5,
          yAxisId: "crypto1",
        },
        {
          label: "Crypto2",
          data: prices2.map((price) => price[1]),
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          borderColor: "green",
          pointRadius: 0.5,
          yAxisId: "crypto2",
        },
      ],
    });
    }
    else{
      setChartData({
        labels: prices1.map((price) => convertDate(price[0])),
        datasets: [
          {
            data: prices1.map((price) => price[1]),
            borderColor: "#fc950e",
            borderWidth: 2,
            fill: false,
            tension: 0.25,
            pointRadius: 0.5,
            yAxisId: "crypto1",
          },
        ],
      });
    }
}


