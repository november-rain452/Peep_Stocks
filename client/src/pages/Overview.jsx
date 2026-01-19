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
  const [loading, setLoading] = useState(false);

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

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;
  
  return (
    <div className='flex flex-col gap-5
                    px-8 py-8 sm:px-16'>
      <CompanyHeader name={overviewData.name} />
      <CardHeader
        country={overviewData.country}
        exchange={overviewData.exchange}
        currency={overviewData.currency}
        marketCap={overviewData.marketCap}
        peRatio={overviewData.peRatio}
      />
      <FiftyTwoWeekHighLow
        low={overviewData.fiftyTwoWeekLow}
        high={overviewData.fiftyTwoWeekHigh}
        current={price}
      />
      <DescriptionOverview description={overviewData.description} />
      <OverviewChartArea />
    </div>
  )
}


const CardHeader = ({ country, exchange, currency, marketCap, peRatio }) => {

  return (
    <div className='flex flex-col items-center gap-2
                    sm:items-start sm:flex-row
                    text-xl md:text-2xl'>
      <div>
        <span>{country}</span> • <span className='text-pink-400'>{exchange}</span> • <span>{currency}</span>
      </div>
      <div className='flex items-center gap-4 ml-4 sm:ml-6'>
        <div className='flex flex-col gap-1 items-center sm:flex-row'>
          <h4>Market Cap</h4> <h4>{marketCap}</h4>
        </div>
        <div className='flex flex-col gap-1 items-center sm:flex-row'>
          <h4>P/E Ratio</h4> <h4>{peRatio}</h4>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}


const DescriptionOverview = () => {
  return (
    <div className="text-sm md:text-base leading-relaxed text-slate-600 ">
      <p>
        Apple Inc. is a global technology company designing and selling consumer
        electronics such as the iPhone, Mac, iPad, and Apple Watch.
        It also develops software and services including iOS, macOS, the App Store,
        iCloud, and Apple Music, and is known for its strong ecosystem and brand.
      </p>
    </div>

  )
}

const FiftyTwoWeekHighLow = () => {
  let current = 270;
  let percentage = (current - 209) / (324 - 209) * 100;
  return (
    <div className='space-y-2'>
      <div className='flex justify-between'>
        <span>Low 209.2</span>
        <span>High 324.9</span>
      </div>
      <div className='relative h-1  w-full bg-gray-200 rounded'>
        <div className='absolute h-3 w-1 bg-pink-400'
          style={{ left: `${percentage}%` }}></div>
        <div className='absolute top-2'
          style={{ left: `${percentage - 1.5}%` }}>{current}</div>
      </div>
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