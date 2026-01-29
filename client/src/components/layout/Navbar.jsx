import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../microcomponents/SearchBar'

const Navbar = () => {
  const [toggledSearchState, setToggledSearchState] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const inputRef = useRef(null);


  function toggleSearch() {
    setToggledSearchState(prev => !prev);
  }

  useEffect(() => {
    if (toggledSearchState) {
      inputRef.current?.focus();
    }
  }, [toggledSearchState]);

  return (
    <div className='sticky top-0 z-9999 bg-white'>
      <div className='flex items-center justify-between
                     px-4 py-3 pl-[7vw] h-16
                     w-full
                     md:px-16 md:h-20 md:text-xl
                     border-b border-gray-200'>
        <Link to="/">Peep-Stocks</Link>
        <div className='px-4  hidden lg:flex justify-between gap-2'>
          <Link to="/overview">Overview</Link>
          <Link to="/news">News</Link>
        </div>
        {!isHome && <div className='hidden lg:block'> <SearchBar />  </div>}
        {isHome ? null :
          <div className='relative'>
            <button onClick={toggleSearch} className='w-4 h-4 hover:cursor-pointer
                                                      flex items-center justify-center
                                                      relative 
                                                      sm:w-6 sm:h-6 lg:hidden
                                                      outline-2 outline-gray-500 rounded-full'>
              <img src="/search.svg" alt="search" />
            </button></div>}
        <div className='flex  gap-2'>
          <div>Contact Me</div>
          <div>Dashboard</div>
        </div>
      </div>
      {!isHome && (<FloatySearchBar inputRef={inputRef} open={toggledSearchState} />)}

    </div>
  )
}

const FloatySearchBar = ({ inputRef, open }) => {
  return (
    <div
      className={`bg-white px-4 w-full transition-all duration-300 ease-out 
        transform origin-top lg:hidden overflow-hidden
        ${open
          ? "h-14 opacity-100 translate-y-0 py-2"
          : "h-0 opacity-0 -translate-y-2 py-0 pointer-events-none"
        }`}
    >
      <SearchBar ref={inputRef} />
    </div>
  );
};

export default Navbar