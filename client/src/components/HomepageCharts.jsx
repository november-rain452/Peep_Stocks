import React, { useContext } from 'react'
import ChartData from '../charts/ChartData'
import StockContext from '../context/context-creation/StockContext';
import SymbolContext from '../context/context-creation/SymbolContext';

const HomepageCharts = () => {

  const { dailyData, weeklyData, monthlyData, loading, error } = useContext(StockContext);
  const {symbol} = useContext(SymbolContext);

  if (error) return (<div className='flex items-center justify-center'>
    <p>Error : {error}</p>
  </div>);

  return (
    <div className='w-full h-full min-w-0 overflow-hidden'>
      <ChartData dailyData={dailyData}
        weeklyData={weeklyData}
        monthlyData={monthlyData}
        symbol={symbol}
        isLoading={loading} />
    </div>
  )
}

export default HomepageCharts