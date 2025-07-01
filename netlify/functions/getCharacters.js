// netlify/functions/getCharacters.js
const crypto = require('crypto')
const axios  = require('axios')

exports.handler = async function(event, context) {
  // …ts, pub, priv, hash como antes…

  const url = `https://gateway.marvel.com/v1/public/characters` +
    `?ts=${ts}&apikey=${pub}&hash=${hash}&limit=${limit}&offset=${offset}`

  try {
    const response = await axios.get(url)
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(response.data.data.results),
    }
  } catch (err) {
    console.error('API error:', err)
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify(err.response?.data || { message: err.message }),
    }
  }
}
