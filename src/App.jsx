import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from 'pages/Homepage'
import { Sortpage } from 'pages/Sortpage'
import { Addpage } from 'pages/Addpage'

import { Layout } from 'components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="sort" element={<Sortpage />} />
        <Route path="add" element={<Addpage />} />
      </Route>
    </Routes >
  )
}

export default App
