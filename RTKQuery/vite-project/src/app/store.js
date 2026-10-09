import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';

// --- EVOLUTION: ERA 3 (RTK createAsyncThunk) ---
export const fetchUserRTK = createAsyncThunk('userRTK/fetch', async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.json();
});

const rtkSlice = createSlice({
  name: 'userRTK',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRTK.pending, (state) => { state.loading = true; })
      .addCase(fetchUserRTK.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserRTK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// --- EVOLUTION: ERA 1 & 2 (Legacy Vanilla/Thunk) ---
// Note: In real legacy code, these would be in separate files.
const initialStateLegacy = { data: null, loading: false, error: null };
function legacyReducer(state = initialStateLegacy, action) {
  switch (action.type) {
    case 'FETCH_USER_START': return { ...state, loading: true, error: null };
    case 'FETCH_USER_SUCCESS': return { ...state, loading: false, data: action.payload };
    case 'FETCH_USER_ERROR': return { ...state, loading: false, error: action.payload };
    default: return state;
  }
}

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    rtk: rtkSlice.reducer,
    legacy: legacyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
