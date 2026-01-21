import React, { useContext, useEffect, useState } from 'react'
import CompanyHeader from '../components/CompanyHeader'
import NewsCard from '../components/microcomponents/NewsCard'
import { fetchLatestNews } from '../data-access/StockQuerying';
import SymbolContext from '../context/context-creation/SymbolContext';

const StockNews = () => {

  const { symbol } = useContext(SymbolContext);

  const [newsArticles, setNewsArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let isActive = true;

    if (!symbol) return;

    setError(null);
    setNewsArticles([]);
    setLoading(true);

    fetchLatestNews(symbol)
      .then(data => {
        if (isActive) {
          setNewsArticles(data);
        }
      }).catch(err => {
        if (isActive) {
          setError(err.message);
        }
      }).finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    }

  }, [symbol]);


  return (
    <div className='flex flex-col gap-5
                    px-8 py-8 sm:px-16'>
      <CompanyHeader />
      <h1 className='text-base sm:text-xl md:text-2xl self-center'>NEWS</h1>
      <NewsArea news={newsArticles} error={error} loadingState={loading} />
    </div>
  )
}

const NewsArea = ({ news, error, loadingState }) => {

  if(error) return <div className='flex items-center justify-center'>{error}</div>

  if(loadingState) return (
   <div className='flex items-center justify-center'>
     <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
   </div> )
 
 return (
    <div className='grid grid-cols-1 gap-6 justify-items-center
                  sm:grid-cols-2 lg:grid-cols-3'>
      {news.map((article) => <NewsCard key={article.newsURL} newsData={article} />)}
    </div>
  )
}

export default StockNews