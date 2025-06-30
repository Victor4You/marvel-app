import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterCard({ character }) {
  const { id, name, thumbnail } = character
  const imgUrl = `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`
  return (
    <Link to={`/character/${id}`} className="block bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
      <img src={imgUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-2 text-center font-semibold">{name}</div>
    </Link>
  )
}