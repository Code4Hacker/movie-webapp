import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ComingSoon, Dashboard, Home, MovieTrailer, SignInSide, Trendings } from './screens'
import { coming, dashboard, home, movieslug, signIn, trendings } from './statics/paths'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path={home} />
          <Route element={<Trendings />} path={trendings} />
          <Route element={<ComingSoon />} path={coming} />
          <Route element={<MovieTrailer/>} path={movieslug}/>
          <Route element={<SignInSide/>} path={signIn}/>
          <Route element={<Dashboard/>} path={dashboard}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
