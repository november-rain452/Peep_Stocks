import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Overview from './pages/Overview'
import Layout from './components/Layout'
import StockNews from './pages/StockNews'
import StockProvider from './context/providers/StockProvider'
import StockStatusProvider from './context/providers/StockStatusProvider'
import SymbolProvider from './context/providers/SymbolProvider'

const App = () => {
  return (<>
    <BrowserRouter>
      <SymbolProvider>
        <StockProvider>
          <StockStatusProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/overview' element={<Overview />} />
                <Route path='/news' element={<StockNews />} />
              </Routes>
            </Layout>
          </StockStatusProvider>
        </StockProvider>
      </SymbolProvider>
    </BrowserRouter>
  </>
  )
}

export default App