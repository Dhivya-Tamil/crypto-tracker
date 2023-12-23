import './App.css'
import Header from "./components/Common/Header"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import HomePage from './pages/Home'
import CoinPage from './pages/Coin'
import ComparePage from './pages/ComparePage'
// import { Suspense, lazy } from 'react'
// import Loader from './components/Common/Loader';

// const HomePage = lazy(()=>import("./pages/Home"));
// const CoinPage = lazy(()=>import("./pages/Coin"));
// const DashBoard = lazy(()=>import("./pages/ComparePage"));
// const ComparePage = lazy(()=>import("./pages/ComparePage"));


function App() {
 

  return (
    <>
      <div className='App'>
       <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/coin/:id' element={<CoinPage />} />
            <Route path='/compare' element={<ComparePage/>} />
            {/* <Route path='/watchList' element={<WatchListPage/>} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
