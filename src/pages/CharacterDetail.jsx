import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCharacterById } from '../api/marvel'

export default function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getCharacterById(id)
      .then(data => setCharacter(data))
      .catch(() => setError('Error cargando detalle.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="p-4">Cargando detalle…</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>

  const { name, description, thumbnail, comics, series, stories } = character
  const imgUrl = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline">← Volver</Link>
      <div className="mt-4 bg-white shadow rounded p-4">
        <img src={imgUrl} alt={name} className="w-full rounded mb-4" />
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <p className="mb-4">{description || 'Sin descripción disponible.'}</p>
        <h2 className="text-xl font-semibold mb-2">Comics</h2>
        <ul className="list-disc list-inside mb-4">
          {comics.items.map(item => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Series</h2>
        <ul className="list-disc list-inside mb-4">
          {series.items.map(item => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Stories</h2>
        <ul className="list-disc list-inside">
          {stories.items.map(item => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}