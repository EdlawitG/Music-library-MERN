const Song = require("../models/song");
async function listSong(req, res, next) {
  try {
    const songs = await Song.find({});
    if (!songs) {
      return res.status(404).json({ error: "song not found" });
    }
    res.json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
}
async function getById(req, res) {
  try {
    const id = req.params.id;
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: "song not found" });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
}
async function postSong(req, res, next) {
  try {
    const { title, artist, album, genre } = req.body;
    const song = new Song({ title, artist, album, genre });
    await song.save();
    res.status(201).json({ message: "Song  created successfully", song });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create song" });
  }
}
async function updateSong(req, res, next) {
  const { title, artist, album, genre } = req.body;
  var id = req.params.id;
  try {
    const updatedItem = await Song.findByIdAndUpdate(id, {
      title,
      artist,
      album,
      genre,
    });
    if (!updatedItem) return res.status(404).send(" Id is not Found");
    res.json({ message: "Song updated successfully", updatedItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update song" });
  }
}
async function deleteSong(req, res, next) {
  let id = req.params.id;
  try {
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return res.status(404).json({ error: "song not found" });
    }
    res.json({ message: "song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete song" });
  }
}
async function totals(req, res) {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct("artist").then(
      (artists) => artists.length
    );
    const totalAlbums = await Song.distinct("album").then(
      (albums) => albums.length
    );
    const totalGenres = await Song.distinct("genre").then(
      (genres) => genres.length
    );
    res.json({ totalSongs, totalArtists, totalAlbums, totalGenres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function numOfSongInGenre(req, res) {
  try {
    const songsPerGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);
    res.json(songsPerGenre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function numOfSongandAlbumForArtist(req, res) {
  try {
    const artistInfo = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          totalSongs: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          artist: "$_id",
          totalSongs: 1,
          totalAlbums: { $size: "$albums" },
        },
      },
    ]);
    res.json(artistInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function numOfSongInAlbum(req, res) {
  try {
    const songsPerAlbum = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          artists: { $addToSet: "$artist" },
          songs: {
            $addToSet: { title: "$title", id: "$_id", genre: "$genre" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          album: "$_id",
          artists: 1,
          genres: 1,
          songs: 1,
          count: 1,
        },
      },
    ]);
    res.json(songsPerAlbum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function filterByGener(req, res) {
  try {
    const { genre } = req.query;
    const songs = await Song.find({ genre });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function filterByArtist(req, res) {
  try {
    const { artist } = req.query;

    const artistData = await Song.aggregate([
      { $match: { artist } },
      {
        $group: {
          _id: "$album",
          album: { $first: "$album" },
          songs: { $push: { title: "$title", id: "$_id", genre: "$genre" } },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$artist",
          numberOfAlbums: { $sum: 1 },
          totalNumberOfSongs: { $sum: "$count" },
          albums: {
            $push: {
              album: "$album",
              songs: "$songs",
              genres: "$genres",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          numberOfAlbums: 1,
          totalNumberOfSongs: 1,
          albums: 1,
        },
      },
    ]);

    if (artistData.length === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.json(artistData[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function searchSongs(req, res) {
  try {
    const { song } = req.query;
    const songs = await Song.find({ title: song });
    if (!songs) {
      return res.status(404).json({ error: "song not found" });
    }
    res.json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
}
async function searchAlbum(req, res) {
  try {
    const { album } = req.query;
    const songs = await Song.find({ album: album });
    if (!songs) {
      return res.status(404).json({ error: "song not found" });
    }
    res.json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
}
module.exports = {
  listSong,
  getById,
  postSong,
  updateSong,
  deleteSong,
  numOfSongInGenre,
  numOfSongandAlbumForArtist,
  numOfSongInAlbum,
  totals,
  filterByGener,
  filterByArtist,
  searchAlbum,
  searchSongs,
};
