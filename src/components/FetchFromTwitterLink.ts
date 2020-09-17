const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.REACT_APP_TWITTER_BEARER_TOKEN
});

function asyncFetchImageURLListFromTwitter(twitterID: string) {
  return new Promise((resolve, reject) => {
    client.get('statuses/show/' + twitterID, {}, function(error: any, tweets: any, response: any) {
      if (error) {
        reject(error);
        return;
      }
      const mediaArray = tweets.extended_entities["media"]
      resolve(mediaArray);
    });
  })
}

async function fetchImageURLFromTwitter(twitterURL: string){
  const re = /.*\/(\d*)/;
  const reArray = re.exec(twitterURL);
  if (reArray === null ){
    return;
  }
  const twitterID = reArray[1];

  const mediaArray: any = await asyncFetchImageURLListFromTwitter(twitterID)
  const imgURLArray = mediaArray.map(function(media: any){
    return media["media_url_https"]
  })
  return imgURLArray;
}

export default async function fetchImgArrayFromTwitterArray(twitterURLArray: string[]) {
  const imgURLArray = await Promise.all(
    twitterURLArray.map(async function(twitterURL: string){
      return await fetchImageURLFromTwitter(twitterURL);
    })
  );
  const imgArray = imgURLArray.flat();
  console.log(imgArray);
  return imgArray;
}
