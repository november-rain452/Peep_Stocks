import React, { useContext, useEffect, useState } from 'react'
import StockStatusContext from '../context/context-creation/StockStatusContext'
import { fetchStockLogo } from '../data-access/StockQuerying';
import StockContext from '../context/context-creation/StockContext';

const CompanyHeader = ({ name }) => {
  
  const { stockStatus, loading } = useContext(StockStatusContext);
  const { symbol } = useContext(StockContext);

  const [logoData, setLogoData] = useState(null);
  const [error, setError] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {

    let isActive = true;

    if (!symbol) return;

    setError(null);
    setLogoData(null);
    setImgLoading(true);

    fetchStockLogo(symbol)
      .then(data => {
        if (isActive) {
          setLogoData(data);
        }
      })
      .catch(err => {
        if (isActive) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isActive) {
          setImgLoading(false);
        }
      }
      )

    return () => {
      isActive = false;
    }
  }, [symbol]);

  function displayValue(value) {
    if (loading || value === undefined || value === null) return "-";
    else
      return value;
  }

  function formatPercent(value) {
    const num = Number.parseFloat(value);
    if(loading || isNaN(num)) return "-";
    return num.toFixed(2);
  }

  const displayedName = name ?? logoData?.name ?? stockStatus?.symbol;

  const isPositive = stockStatus?.change >= 0;
  const sign = isPositive ? "+" : "";
  const color = isPositive ? "text-green-800" : "text-red-800";

  return (
    <div className='flex flex-col items-center gap-4
                    sm:grid sm:grid-cols-[auto_1fr]  sm:gap-x-4 sm:grid-rows-2'>
      <div className="sm:row-span-full
                w-20 h-20
                sm:w-24 sm:h-24
                lg:w-40 lg:h-40
                border-2 border-black
                rounded-full
                flex items-center justify-center">

        {error ? (
          <p>{error}</p>
        ) : (
          <img
            className="w-3/4 h-3/4 object-contain"
            src={imgLoading ? "/circle_placeholder.svg" : logoData?.image ?? "/circle_placeholder.svg"}
            alt={stockStatus?.symbol ?? "Stock Image"}
          />
        )}
      </div>

      <div>
        <div className='max-w-70 sm:max-w-200 truncate text-3xl sm:text-4xl lg:text-7xl'>{displayedName}</div>
      </div>
      <div className={`col-span-full sm:pl-0 sm:col-span-1`}>
        <div className='text-xl md:text-4xl flex items-end gap-3'>{displayValue(stockStatus?.price)}
          <span className={`${color} text-base md:text-xl`}>{sign}{displayValue(stockStatus?.change)}</span>
          <span className={`${color} text-base md:text-xl`}>{sign}{formatPercent(stockStatus?.changePercent)}</span>
        </div>
      </div>
    </div>
  )
}

export default CompanyHeader

