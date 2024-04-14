const getRecentTracks = require('./getRecentTracks');
const getRecommendations = require('./getRecommendations');
const dotenv = require('dotenv');

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;
const numTracks = 25;

(async () => {
    try {
        const recentTracks = await getRecentTracks(accessToken, numTracks);
        recentTracks.forEach(async (track) => {
            try {

                const recommendations = await getRecommendations(track.artistIds, [track.trackId], []);
                recommendations.forEach(recommendedTrack => {
                    console.log(recommendedTrack.artistNames);
                    console.log(recommendedTrack.trackName);
                    console.log(recommendedTrack.trackId);
                });
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
})();