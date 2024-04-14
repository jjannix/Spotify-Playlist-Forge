const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function getRecommendations(seed_artists, seed_tracks, seed_genres) {
    const options = {
      method: 'GET',
      url: 'https://api.spotify.com/v1/recommendations',
      params: {
        seed_artists,
        seed_tracks,
        seed_genres,
        limit: 20,
        market: 'DE',
      },
      headers: {
        'Authorization': 'Bearer ' + process.env.SPOTIFY_ACCESS_TOKEN,
      }
    };

    try {
      const response = await axios.request(options);
      const tracks = response.data.tracks;

      const recommendedTracksData = tracks.map(track => ({
          artistNames: track.artists.map(artist => artist.name).join(', '),
          trackName: track.name,
          trackId: track.id,
       }));
       return recommendedTracksData;
} catch (error) {
  if (error.response) {

      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
  } else if (error.request) {

      console.error('No response received from server');
      console.error('Request:', error.request);
  } else {

      console.error('Error:', error.message);
  }
  throw error;
}
}
