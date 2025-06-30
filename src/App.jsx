import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CharacterDetail from './pages/CharacterDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}