const OldImgHostURL = "https://lol-stats-analysis-images.s3.amazonaws.com";

// patch version needs to be updated every time a new champion is introduced to keep up with new champions
// shouldn't break unless Riot is mean and takes down their CDN for older patches :<
const patchVersion = "10.16.1";

const ImgHostURL = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img`;

const ImgHostSplashURL = `https://ddragon.leagueoflegends.com/cdn/img`;

export { OldImgHostURL, ImgHostURL, ImgHostSplashURL };
