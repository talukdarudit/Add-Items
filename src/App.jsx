import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddItems from './pages/AddItems'
import ViewItems from './pages/ViewItems'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/view-items" element={<ViewItems />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App