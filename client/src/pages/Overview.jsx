import React, { useContext, useEffect, useState } from 'react'
import ChartData from '../charts/ChartData'
import CompanyHeader from '../components/CompanyHeader'
import StockContext from '../context/context-creation/StockContext';
import { fetchCompanyOverview } from '../data-access/StockQuerying';
import StockStatusContext from '../context/context-creation/StockStatusContext';

const Overview = () => {

  const { symbol } = useContext(StockContext);
  const { price } = useContext(StockStatusContext);

  const [overviewData, setOverviewData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let isActive = true;

    if (!symbol) return;

    setError(null);
    setOverviewData(null);
    setLoading(true);

    fetchCompanyOverview(symbol)
      .then(data => {
        if (isActive) {
          setOverviewData(data);
        }
      }
      ).catch(err => {
        if (isActive) {
          setError(err.message)
        }
      }).finally(() => {
        if (isActive) {
          setLoading(false);
        }
      }
      );

    return () => {
      isActive = false;
    }
  }, [symbol]);


  const displayValue = (loading, value) => {
    if (loading || value === null || value === undefined) {
      return "-";
    }
    else return value;
  }

  return (
    <div className='flex flex-col gap-5
                    px-8 py-8 sm:px-16'>
      {error}               
      <CompanyHeader name={overviewData?.name} />
      <CardHeader
        country={overviewData?.country}
        exchange={overviewData?.exchange}
        currency={overviewData?.currency}
        marketCap={overviewData?.marketCap}
        peRatio={overviewData?.peRatio}
        loading={loading}
        displayValue={displayValue}
      />
      <FiftyTwoWeekHighLow
        low={overviewData?.fiftyTwoWeekLow}
        high={overviewData?.fiftyTwoWeekHigh}
        current={price}
        loading={loading}
        displayValue={displayValue}
      />
      <DescriptionOverview
        description={overviewData?.description}
        loading={loading}
        displayValue={displayValue}
      />
      <OverviewChartArea />
    </div>
  )
}


const CardHeader = ({ country, exchange, currency, marketCap, peRatio, loading, displayValue }) => {

  return (
    <div className='flex flex-col items-center gap-2
                    sm:items-start sm:flex-row
                    text-xl md:text-2xl'>
      <div>
        <span>{displayValue(loading, country)}</span> • <span className='text-pink-400'>{displayValue(loading, exchange)}</span> • <span>{displayValue(loading, currency)}</span>
      </div>
      <div className='flex items-center gap-4 ml-4 sm:ml-6'>
        <div className='flex flex-col gap-1 items-center sm:flex-row'>
          <h4>Market Cap</h4> <h4>{displayValue(loading, marketCap)}</h4>
        </div>
        <div className='flex flex-col gap-1 items-center sm:flex-row'>
          <h4>P/E Ratio</h4> <h4>{displayValue(loading, peRatio)}</h4>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

const FiftyTwoWeekHighLow = ({low, high, current, loading, displayValue}) => {
  let diff = high - low;
  let percentage = (loading || diff === 0) ? 0 : (current - low) / (diff) * 100;

  return (
    <div className='space-y-2'>
      <div className='flex justify-between'>
        <span>Low {displayValue(loading, low)}</span>
        <span>High {displayValue(loading, high)}</span>
      </div>
      <div className='relative h-1  w-full bg-gray-200 rounded'>
        <div className='absolute h-3 w-1 bg-pink-400'
          style={{ left: `${percentage}%` }}></div>
        <div className='absolute top-2'
          style={{ left: `${percentage - 1.5}%` }}>{displayValue(loading, current)}</div>
      </div>
    </div>
  )
}

const DescriptionOverview = ({description, loading, displayValue}) => {
  return (
    <div className="text-sm md:text-base leading-relaxed text-slate-600 ">
      <p>
        {displayValue(loading, description)}
      </p>
    </div>

  )
}

const OverviewChartArea = () => {
  const { dailyData, weeklyData, monthlyData, loading, error, symbol } = useContext(StockContext);
  if (error) return (<div className='flex items-center justify-center'>
    <p>Error : {error}</p>
  </div>);
  return (
    <ChartData dailyData={dailyData}
      weeklyData={weeklyData}
      monthlyData={monthlyData}
      symbol={symbol}
      isLoading={loading} />
  )
}
export default Overview