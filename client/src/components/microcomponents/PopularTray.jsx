import React, { useContext } from 'react'
import StockContext from '../../context/context-creation/StockContext';
import SymbolContext from '../../context/context-creation/SymbolContext';

const PopularTray = () => {

  const {searchSymbol} = useContext(SymbolContext);

  const handleClick = (symbol)=>{
      searchSymbol(symbol);
  }


  let btnStyle="text-xl hover:cursor-pointer py-2 px-6 rounded-full border-1 border-[#e7e7e9] hover:bg-[#faf9fb]";
  
  return (
    <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
        <button onClick={()=>handleClick("NVDA")} className={`${btnStyle}`}>Nvidia</button>
        <button onClick={()=>handleClick("META")} className={`${btnStyle}`}>Meta</button>
        <button onClick={()=>handleClick("MSFT")} className={`${btnStyle} col-span-2 md:col-span-1`}>Microsoft</button>
        <button onClick={()=>handleClick("HPQ")} className={`${btnStyle}`}>HP</button>
        <button onClick={()=>handleClick("INTC")} className={`${btnStyle}`}>Intel</button>
        <button onClick={()=>handleClick("ADBE")} className={`${btnStyle} col-span-2 md:col-span-1`}>Adobe</button>
    </div>
  )
}

export default PopularTray