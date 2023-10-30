const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const cors = require("cors");

//TODO: Adding Cors
app.use(
  cors({
    exposedHeaders: "**",
  })
);

app.get("/vdo", async (req, res, next) => {
  console.log(req.query.url);
  let result = [];
  try {
    const vdourl = req.query.url;
    const vdoinfo = await ytdl.getInfo(vdourl);
    // console.log(vdoinfo);
    const audio = ytdl.filterFormats(vdoinfo.formats, "audioonly");
    // console.log(audio);
    audio.map((item) => {
      result.push(item);
    });
    return res.json({
      title: vdoinfo["videoDetails"]["title"],
      thumb: vdoinfo["videoDetails"]["thumbnails"][0]["url"],
      author: vdoinfo["videoDetails"]["author"]["name"],
      url: result[1]["url"],
    });
  } catch (error) {
    console.log(error);
  }
  next();
});

app.listen(3030, () => {
  console.log("Server Running on Port 3030");
});
