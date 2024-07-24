import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  call,
  debounce,
  put,
  StrictEffect,
  takeLatest,
} from "redux-saga/effects";
import {
  addSongFailure,
  addSongStart,
  addSongSuccess,
  deleteSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  editSongFailure,
  editSongStart,
  editSongSuccess,
  fetchAlbumsSuccess,
  fetchArtistsSuccess,
  fetchGenresStart,
  fetchGenresSuccess,
  fetchSongByIdFailure,
  fetchSongByIdStart,
  fetchSongByIdSuccess,
  fetchSongInGenresSuccess,
  fetchSongsByArtistFailure,
  fetchSongsByArtistStart,
  fetchSongsByArtistSuccess,
  fetchSongsFailure,
  fetchSongsStart,
  fetchSongsSuccess,
  fetchTotalsSuccess,
} from "./songSlice";

interface FetchSongsByGenreAction {
  type: string;
  payload: string;
}
const API = "https://music-library-mern-production-a9fe.up.railway.app/";

function* fetchSongs(): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(axios.get, API + "songs");
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(
        fetchSongsFailure(error.response?.data.message || error.message)
      );
    } else {
      yield put(fetchSongsFailure("An unexpected error occurred."));
    }
  }
}

function* fetchTotals(): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(axios.get, API + "totals");
    yield put(fetchTotalsSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(
        fetchSongsFailure(error.response?.data.message || error.message)
      );
    } else {
      yield put(fetchSongsFailure("An unexpected error occurred."));
    }
  }
}

function* fetchArtists(): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(axios.get, API + "noofSongnAlbum");
    yield put(fetchArtistsSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(
        fetchSongsFailure(error.response?.data.message || error.message)
      );
    } else {
      yield put(fetchSongsFailure("An unexpected error occurred."));
    }
  }
}

function* fetchAlbums(): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(axios.get, API + "noofsonginalbum");
    yield put(fetchAlbumsSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(
        fetchSongsFailure(error.response?.data.message || error.message)
      );
    } else {
      yield put(fetchSongsFailure("An unexpected error occurred."));
    }
  }
}
function* fetchGenres(
  action: FetchSongsByGenreAction
): Generator<StrictEffect, void, any> {
  try {
    const genre = action.payload;
    const response = yield call(
      axios.get,
      API + `filterbygener?genre=${genre}`
    );
    yield put(fetchGenresSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(
        fetchSongsFailure(error.response?.data.message || error.message)
      );
    } else {
      yield put(fetchSongsFailure("An unexpected error occurred."));
    }
  }
}
function* fetchSongInGenres(): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(axios.get, API + `noofsongs`);
    yield put(fetchSongInGenresSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(
        fetchSongsFailure(error.response?.data.message || error.message)
      );
    } else {
      yield put(fetchSongsFailure("An unexpected error occurred."));
    }
  }
}
function* addSong(
  action: ReturnType<typeof addSongStart>
): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(axios.post, API + "postsong", action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(addSongFailure(error.response?.data.message || error.message));
    } else {
      yield put(addSongFailure("An unexpected error occurred."));
    }
  }
}
function* fetchSongsByArtist(
  action: ReturnType<typeof fetchSongsByArtistStart>
): Generator<StrictEffect, void, any> {
  try {
    const artist = action.payload;
    const response = yield call(axios.get, API + `artist/?artist=${artist}`);
    yield put(fetchSongsByArtistSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(
        fetchSongsByArtistFailure(error.response?.data.message || error.message)
      );
    } else {
      yield put(fetchSongsByArtistFailure("An unexpected error occurred."));
    }
  }
}
function* fetchSongById(
  action: ReturnType<typeof fetchSongByIdStart>
): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(axios.get, API + `song/${action.payload}`);
    yield put(fetchSongByIdSuccess(response.data));
  } catch (error) {
    yield put(
      fetchSongByIdFailure(
        axios.isAxiosError(error)
          ? error.response?.data.message || error.message
          : "An unexpected error occurred."
      )
    );
  }
}

function* editSong(
  action: PayloadAction<any>
): Generator<StrictEffect, void, any> {
  try {
    const response = yield call(
      axios.put,
      API + `updatesong/${action.payload.id}`,
      action.payload
    );
    yield put(editSongSuccess(response.data));
  } catch (error) {
    yield put(
      editSongFailure(
        axios.isAxiosError(error)
          ? error.response?.data.message || error.message
          : "An unexpected error occurred."
      )
    );
  }
}

function* deleteSong(
  action: PayloadAction<number>
): Generator<StrictEffect, void, any> {
  try {
    yield call(axios.delete, API + `deletesong/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(
      deleteSongFailure(
        axios.isAxiosError(error)
          ? error.response?.data.message || error.message
          : "An unexpected error occurred."
      )
    );
  }
}
export function* songSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongs);
  yield takeLatest(fetchSongsStart.type, fetchTotals);
  yield takeLatest(fetchSongsStart.type, fetchArtists);
  yield takeLatest(fetchSongsStart.type, fetchAlbums);
  yield takeLatest(fetchSongsStart.type, fetchSongInGenres);
  yield takeLatest(fetchGenresStart.type, fetchGenres);
  yield takeLatest(addSongStart.type, addSong);
  yield debounce(300, fetchSongByIdStart.type, fetchSongById);
  yield takeLatest(editSongStart.type, editSong);
  yield takeLatest(deleteSongStart.type, deleteSong);
  yield takeLatest(fetchSongsByArtistStart.type, fetchSongsByArtist);
}
