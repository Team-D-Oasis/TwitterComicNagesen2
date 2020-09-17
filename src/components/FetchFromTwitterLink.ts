const Twitter = require('twitter');



function asyncFetchImageURLListFromTwitter(twitterID: string) {
  return new Promise((resolve, reject) => {
    client.get('statuses/show/' + twitterID, {}, function(error: any, tweets: any, response: any) {
      if (error) {
        reject(error);
        return;
      }
      const mediaArray = tweets.extended_entities["media"];
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

// const twitterURLArray = ["https://twitter.com/Sora_Misaki_/status/1306065272768352256", "https://twitter.com/Sora_Misaki_/status/1306065272768352256"]

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

// fetchImgArrayFromTwitterArray(twitterURLArray);