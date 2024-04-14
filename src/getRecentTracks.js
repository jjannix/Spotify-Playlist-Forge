const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function getRecentTracks(accessToken, numTracks) {
    const options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        params: { limit: numTracks },
        headers: {
            'Authorization': 'Bearer ' + process.env.SPOTIFY_ACCESS_TOKEN,
        }
    };

    try {
        const response = await axios.request(options);
        const tracks = response.data.items;


        const recentTracksData = tracks.map(track => ({
            artistNames: track.track.artists.map(artist => artist.name).join(','),
            artistIds: track.track.artists.map(artist => artist.id).join(','),
            trackName: track.track.name,
            trackId: track.track.id,
        }));

        return recentTracksData;

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
