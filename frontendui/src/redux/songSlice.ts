import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongState {
  songs: any[];
  songIn: any[];
  totals: any;
  artists: any[];
  song: {
    album: string;
    title: string;
    artist: string;
    genre: string;
  } | null;
  artist: {
    numberOfAlbums: number;
    totalNumberOfSongs: number;
    albums: Array<{
      album: string;
      songs: string[];
      count: number;
    }>;
  } | null;
  albums: any[];
  genres: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  song: null,
  songIn: [],
  totals: {},
  artists: [],
  artist: null,
  albums: [],
  genres: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchSongByIdStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchSongByIdSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.song = action.payload;
    },
    fetchSongByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editSongStart(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    editSongSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.songs = state.songs.map((song) =>
        song.id === action.payload._id ? action.payload : song
      );
    },
    editSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGenresStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTotalsSuccess(state, action: PayloadAction<any>) {
      state.totals = action.payload;
    },
    fetchArtistsSuccess(state, action: PayloadAction<any[]>) {
      state.artists = action.payload;
    },
    fetchAlbumsSuccess(state, action: PayloadAction<any[]>) {
      state.albums = action.payload;
    },
    fetchGenresSuccess(state, action: PayloadAction<any[]>) {
      state.genres = action.payload;
    },
    fetchSongInGenresSuccess(state, action: PayloadAction<any[]>) {
      state.songIn = action.payload;
    },
    addSongStart(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.songs.push(action.payload);
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSongsByArtistStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsByArtistSuccess(state, action) {
      state.artist = action.payload;
      state.loading = false;
    },
    fetchSongsByArtistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchGenresStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchTotalsSuccess,
  fetchArtistsSuccess,
  fetchAlbumsSuccess,
  fetchGenresSuccess,
  fetchSongInGenresSuccess,
  addSongFailure,
  addSongStart,
  addSongSuccess,
  fetchSongByIdFailure,
  fetchSongByIdStart,
  fetchSongByIdSuccess,
  editSongFailure,
  editSongStart,
  editSongSuccess,
  deleteSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  fetchSongsByArtistFailure,
  fetchSongsByArtistStart,
  fetchSongsByArtistSuccess,
} = songSlice.actions;

export default songSlice.reducer;
