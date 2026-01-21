import React, { useContext, useEffect, useState } from 'react'
import { fetchStockStatus } from '../../data-access/StockQuerying';
import StockStatusContext from '../context-creation/StockStatusContext';
import SymbolContext from '../context-creation/SymbolContext';

const StockStatusProvider = ({children}) => {

    const [stockStatus, setStockStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { symbol } = useContext(SymbolContext);
    
    useEffect(() => {

        let isActive = true;
        if (!symbol) return;

        setLoading(true);
        setError(null);


        fetchStockStatus(symbol)
            .then(data => {
                if (isActive) {
                    setStockStatus(data);
                }
            })
            .catch(err => {
                if (isActive) {
                    setError(err.message)
                }
            })
            .finally(() => {
                if (isActive) {
                    setLoading(false)
                }
            });

            return ()=>{
                isActive=false;
            }

    }, [symbol]);
    return (
        <StockStatusContext.Provider value={{stockStatus,loading,error}}>
            {children}
        </StockStatusContext.Provider>
        )
}

export default StockStatusProvider