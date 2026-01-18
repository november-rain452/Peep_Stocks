import React, { useEffect, useState } from 'react'
import { fetchDailyStocks, fetchMonthlyStocks, fetchWeeklyStocks } from '../../data-access/StockQuerying';
import StockContext from '../context-creation/StockContext';

const StockProvider = ({ children }) => {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState("IBM");

  useEffect(() => {

    let activeRequest = true;

    const fetchStockDataUniversal = async (symbol) => {
      try {

        setLoading(true);
        setError(null);

        const [dailyD,weeklyD,monthlyD] = await Promise.all([
          fetchDailyStocks(symbol),
          fetchWeeklyStocks(symbol),
          fetchMonthlyStocks(symbol)
        ]);

        if(activeRequest){
          setDailyData(dailyD);
          setWeeklyData(weeklyD);
          setMonthlyData(monthlyD);
        }
      }
      catch (err) {
        if(activeRequest){
        console.error(err);
        setError(err.message || "Failed to fetch stock data");}
      }
      finally {
        if(activeRequest){
        setLoading(false);}
      }
    };

    if (symbol) {
      fetchStockDataUniversal(symbol);
    }
    return ()=>{
      activeRequest=false;
    }

  }, [symbol])

  const searchStock = (newSymbol) => {
    setSymbol(newSymbol);
  }




  return (
    <StockContext.Provider value={{ dailyData, weeklyData, monthlyData, loading, error, symbol, searchStock }}>
      {children}
    </StockContext.Provider>
  )
}

export default StockProvider