import React, { useState } from 'react'
import SymbolContext from '../context-creation/SymbolContext'

const SymbolProvider = ({children}) => {

    const [symbol,setSymbol] = useState("IBM"); 

    const searchSymbol = (ticker) => {
        setSymbol(ticker);
    }

  return (
    <SymbolContext.Provider value={{symbol,searchSymbol}}>
    {children}
    </SymbolContext.Provider>
  )
}

export default SymbolProvider