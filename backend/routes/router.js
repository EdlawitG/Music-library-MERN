const express = require("express");
const {
  listSong,
  postSong,
  updateSong,
  deleteSong,
  getById,
  totals,
  numOfSongInGenre,
  numOfSongandAlbumForArtist,
  numOfSongInAlbum,
  filterByGener,
  filterByArtist,
  searchSongs,
  searchAlbum,
} = require("../controllers/song.controller");
const router = express.Router();
router.get("/songs", listSong);
router.get("/song/:id", getById);
router.get("/totals", totals);
router.get("/noofsongs", numOfSongInGenre);
router.get("/noofSongnAlbum", numOfSongandAlbumForArtist);
router.get("/noofsonginalbum", numOfSongInAlbum);
router.get("/filterbygener", filterByGener);
router.get("/artist", filterByArtist);
router.get("/searchsong", searchSongs);
router.get("/searchAlbum", searchAlbum);
router.post("/postsong", postSong);
router.put("/updatesong/:id", updateSong);
router.delete("/deletesong/:id", deleteSong);

module.exports = router;
