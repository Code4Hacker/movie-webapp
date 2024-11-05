import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ComingSoon, Home, Trendings } from './screens'
import { coming, home, trendings } from './statics/paths'
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
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
