import React, { useState, useEffect } from 'react'
import { getCharacters } from '../api/marvel'
import CharacterCard from '../components/CharacterCard'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getCharacters()
      .then(data => setCharacters(data))
      .catch(() => setError('Error cargando personajes.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-4">Cargando personajes…</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {characters.map(char => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  )
}