import React from 'react';

/* ═══════════════════════════════════════════════════════════════════
   ReduxEvolution.jsx
   
   A comprehensive, side-by-side comparison of 4 Redux Eras.
   Use case: "Fetching a user's details by ID"
   ═══════════════════════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────
// REUSABLE UI HELPERS
// ──────────────────────────────────────────────────
const CodeBlock = ({ fileName, children }) => (
  <div className="code-block">
    <div className="code-block-header">
      <span className="file-icon">📄</span>
      {fileName}
    </div>
    <pre>{children}</pre>
  </div>
);

const ConceptSection = ({ label, description, children }) => (
  <div className="concept-section">
    <div className="concept-label">
      <span className="dot" />
      <span className="label-text">{label}</span>
    </div>
    {description && <p className="concept-desc">{description}</p>}
    {children}
  </div>
);

// ══════════════════════════════════════════════════
// ERA 1: VANILLA REDUX (2015)
// ══════════════════════════════════════════════════
const Era1VanillaRedux = () => (
  <div className="era-card era-1">
    <span className="era-badge">Era 1 · 2015</span>
    <h2>Vanilla Redux</h2>
    <p className="era-year">The Foundation — Manual Everything</p>

    <div className="insight-box">
      <strong>Senior Dev Insight:</strong> This is the raw Flux pattern. You own every
      byte of state. The tradeoff? For a single API call, you need to
      create <strong>3 action types</strong>, <strong>3 action creators</strong>, 
      a <strong>reducer with switch/case</strong>, and manually call <code>dispatch</code> inside
      your component's <code>useEffect</code>.
    </div>

    {/* ── STEP 1: Action Types ── */}
    <ConceptSection
      label="Step 1 — Action Type Constants"
      description="Every action needs a unique string type. By convention, these live in a constants file to avoid typos. In a real app, you'd have dozens of these files."
    >
      <CodeBlock fileName="actionTypes.js">
{`// ❶ You MANUALLY define a string constant 
//   for EVERY state transition.
//   One API call = 3 constants minimum.

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 2: Action Creators ── */}
    <ConceptSection
      label="Step 2 — Action Creators"
      description="Pure functions that return plain objects. They DO NOT handle any async logic — that's the component's job in this era."
    >
      <CodeBlock fileName="userActions.js">
{`import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './actionTypes';

// ❷ Each action creator returns a plain object.
//   No async logic here — just data + type.

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 3: Reducer ── */}
    <ConceptSection
      label="Step 3 — Reducer (switch/case)"
      description="The reducer is a pure function. You MUST return a new object reference every time (spread operator). Direct mutation = bugs. This is the #1 source of Redux bugs for beginners."
    >
      <CodeBlock fileName="userReducer.js">
{`import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './actionTypes';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

// ❸ Every action goes through this switch.
//   You MUST spread (...state) to avoid mutation.
//   Miss a spread? Silent bug. Good luck debugging.

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,          // ← immutability by hand
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 4: Store ── */}
    <ConceptSection
      label="Step 4 — Store Setup"
      description="createStore is the original API. combineReducers manually merges all your reducers. No middleware by default."
    >
      <CodeBlock fileName="store.js">
{`import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';

// ❹ Manual store creation. 
//   No devtools, no middleware out of the box.

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 5: Component ── */}
    <ConceptSection
      label="Step 5 — Component (The Pain)"
      description="The component is responsible for orchestrating the entire fetch lifecycle. It dispatches START, then fetches, then dispatches SUCCESS or FAILURE. This is business logic leaking into your UI layer."
    >
      <CodeBlock fileName="UserProfile.jsx">
{`import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from './userActions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(
    (state) => state.user
  );

  // ❺ ALL async logic lives in the component.
  //   Every component that fetches data repeats
  //   this exact pattern. No reuse.
  useEffect(() => {
    dispatch(fetchUserRequest());

    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data) => dispatch(fetchUserSuccess(data)))
      .catch((err) =>
        dispatch(fetchUserFailure(err.message))
      );
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{user?.name} — {user?.email}</p>;
};`}
      </CodeBlock>
    </ConceptSection>

    <div className="section-divider" />

    <ConceptSection label="Pain Points">
      <ul className="pain-list">
        <li>3 action types + 3 action creators per API call</li>
        <li>Immutability by hand (spread operator everywhere)</li>
        <li>Async logic leaks into the component</li>
        <li>No caching, no deduplication, no refetch logic</li>
        <li>Massive boilerplate for simple CRUD</li>
      </ul>
    </ConceptSection>

    <div className="stats-row">
      <div className="stat-chip">
        <div className="stat-value">5</div>
        <div className="stat-label">Files</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">~80</div>
        <div className="stat-label">Lines</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">3</div>
        <div className="stat-label">Actions</div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════
// ERA 2: REDUX + THUNK (2016)
// ══════════════════════════════════════════════════
const Era2ReduxThunk = () => (
  <div className="era-card era-2">
    <span className="era-badge">Era 2 · 2016</span>
    <h2>Redux + Thunk</h2>
    <p className="era-year">Middleware for Async</p>

    <div className="insight-box">
      <strong>Senior Dev Insight:</strong> Thunk let action creators return
      <strong> functions instead of objects</strong>. This moved async logic OUT
      of components and into reusable action creators. The reducer and action types
      stayed the same — the improvement was solely in <em>where</em> the side effect lived.
    </div>

    {/* ── STEP 1: Same Action Types ── */}
    <ConceptSection
      label="Step 1 — Action Types (Same as Era 1)"
      description="Nothing changed here. You still need the same 3 string constants."
    >
      <CodeBlock fileName="actionTypes.js">
{`// Still the same boilerplate from Era 1.
// Thunk doesn't reduce this at all.

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 2: Thunk Action Creator (THE KEY CHANGE) ── */}
    <ConceptSection
      label="Step 2 — Thunk Action Creator ⭐"
      description="This is the big change. Instead of returning a plain object, the action creator returns a FUNCTION. Redux-thunk middleware intercepts it and passes dispatch as an argument. Now async logic is reusable and testable."
    >
      <CodeBlock fileName="userActions.js">
{`import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './actionTypes';

// ⭐ THE KEY INNOVATION:
// Action creator returns a FUNCTION, not an object.
// redux-thunk middleware sees the function and calls
// it with (dispatch, getState).

export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_REQUEST });

    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      const data = await res.json();
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: err.message,
      });
    }
  };
};`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 3: Reducer (Same) ── */}
    <ConceptSection
      label="Step 3 — Reducer (Identical to Era 1)"
      description="The reducer doesn't change at all. It still uses switch/case and manual spreads. Thunk only changes how actions are dispatched, not how they are reduced."
    >
      <CodeBlock fileName="userReducer.js">
{`// Exact same reducer as Era 1.
// Thunk doesn't help with reducer boilerplate.

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, 
               user: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, 
               error: action.payload };
    default:
      return state;
  }
};`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 4: Store + Middleware ── */}
    <ConceptSection
      label="Step 4 — Store with Middleware"
      description="You now apply the thunk middleware using applyMiddleware(). This is the glue that lets dispatch() accept functions."
    >
      <CodeBlock fileName="store.js">
{`import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './userReducer';

// Apply thunk middleware so dispatch()
// can accept functions, not just objects.

const store = createStore(
  userReducer,
  applyMiddleware(thunk)
);`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 5: Clean Component ── */}
    <ConceptSection
      label="Step 5 — Component (Cleaner! ⭐)"
      description="The component no longer contains fetch logic. It just dispatches the thunk. This is the win — the UI is now decoupled from the data-fetching implementation."
    >
      <CodeBlock fileName="UserProfile.jsx">
{`import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './userActions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(
    (state) => state.user
  );

  // ⭐ Component is now CLEAN.
  //   Just one dispatch call. All async logic
  //   is encapsulated in the thunk action creator.
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{user?.name} — {user?.email}</p>;
};`}
      </CodeBlock>
    </ConceptSection>

    <div className="section-divider" />

    <ConceptSection label="What Improved">
      <ul className="win-list">
        <li>Async logic moved out of components</li>
        <li>Thunks are reusable across components</li>
        <li>Easier to test (mock dispatch)</li>
      </ul>
    </ConceptSection>
    <ConceptSection label="Still Painful">
      <ul className="pain-list">
        <li>Still 3 action type constants</li>
        <li>Still manual switch/case reducer</li>
        <li>Still manual immutability (spread)</li>
        <li>No caching or deduplication</li>
      </ul>
    </ConceptSection>

    <div className="stats-row">
      <div className="stat-chip">
        <div className="stat-value">5</div>
        <div className="stat-label">Files</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">~70</div>
        <div className="stat-label">Lines</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">3</div>
        <div className="stat-label">Actions</div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════
// ERA 3: REDUX TOOLKIT (2019)
// ══════════════════════════════════════════════════
const Era3RTK = () => (
  <div className="era-card era-3">
    <span className="era-badge">Era 3 · 2019</span>
    <h2>Redux Toolkit (RTK)</h2>
    <p className="era-year">The Official, Opinionated Toolset</p>

    <div className="insight-box">
      <strong>Senior Dev Insight:</strong> RTK was a game-changer. <code>createSlice</code> auto-generates
      action types AND action creators. <code>createAsyncThunk</code> standardizes
      the <strong>pending → fulfilled → rejected</strong> lifecycle. And under the hood,
      <strong> Immer.js</strong> lets you write "mutating" code that actually produces
      immutable updates. No more spread operator hell.
    </div>

    {/* ── STEP 1: createAsyncThunk ── */}
    <ConceptSection
      label="Step 1 — createAsyncThunk ⭐"
      description="You define ONE async function. RTK auto-generates 3 action types for you: fetchUser.pending, fetchUser.fulfilled, and fetchUser.rejected. No more manual constants."
    >
      <CodeBlock fileName="userSlice.js (Part 1)">
{`import { createSlice, createAsyncThunk } 
  from '@reduxjs/toolkit';

// ⭐ ONE function replaces:
//   - 3 action type constants
//   - 3 action creators
//   - the thunk logic
//
// RTK auto-generates:
//   fetchUser.pending   → 'user/fetchUser/pending'
//   fetchUser.fulfilled → 'user/fetchUser/fulfilled'
//   fetchUser.rejected  → 'user/fetchUser/rejected'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',             // ← action type prefix
  async (userId, thunkAPI) => {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/users/\${userId}\`
    );
    return res.json();          // ← return value = payload
  }
);`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 2: createSlice ── */}
    <ConceptSection
      label="Step 2 — createSlice (No more switch/case!) ⭐"
      description="createSlice auto-generates action creators and types from reducer functions. For async thunks, you use extraReducers with a builder pattern. Thanks to Immer, you can write state.loading = true directly — it's still immutable under the hood."
    >
      <CodeBlock fileName="userSlice.js (Part 2)">
{`const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },

  // extraReducers handles actions from
  // createAsyncThunk (external actions).
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;   // ⭐ Immer magic!
        state.error = null;     //   Looks like mutation,
      })                        //   but produces NEW object.
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 3: Store ── */}
    <ConceptSection
      label="Step 3 — configureStore"
      description="configureStore replaces createStore + combineReducers + applyMiddleware. It includes redux-thunk, devtools, and serialization checks by default. One function, zero config."
    >
      <CodeBlock fileName="store.js">
{`import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// configureStore automatically includes:
//   ✓ redux-thunk middleware
//   ✓ Redux DevTools Extension
//   ✓ Serialization checks (dev mode)
//   ✓ Immutability checks (dev mode)

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 4: Component ── */}
    <ConceptSection
      label="Step 4 — Component (Same simplicity as Thunk)"
      description="The component code is nearly identical to thunk era. The big wins are behind the scenes: less boilerplate, safer immutability, auto-generated types."
    >
      <CodeBlock fileName="UserProfile.jsx">
{`import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser(1));  // pass userId as arg
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{user?.name} — {user?.email}</p>;
};`}
      </CodeBlock>
    </ConceptSection>

    <div className="section-divider" />

    <ConceptSection label="What Improved">
      <ul className="win-list">
        <li>Zero action type constants (auto-generated)</li>
        <li>Zero action creators (auto-generated)</li>
        <li>Immer handles immutability (write mutations safely)</li>
        <li>Builder pattern replaces switch/case</li>
        <li>DevTools & middleware included by default</li>
      </ul>
    </ConceptSection>
    <ConceptSection label="Still Painful">
      <ul className="pain-list">
        <li>Still need extraReducers for async lifecycle</li>
        <li>No automatic caching or request deduplication</li>
        <li>No automatic refetch on mount/focus</li>
        <li>You still "manage" server state manually</li>
      </ul>
    </ConceptSection>

    <div className="stats-row">
      <div className="stat-chip">
        <div className="stat-value">3</div>
        <div className="stat-label">Files</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">~45</div>
        <div className="stat-label">Lines</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">0</div>
        <div className="stat-label">Manual Actions</div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════
// ERA 4: RTK QUERY (2021+)
// ══════════════════════════════════════════════════
const Era4RTKQuery = () => (
  <div className="era-card era-4">
    <span className="era-badge">Era 4 · 2021+</span>
    <h2>RTK Query</h2>
    <p className="era-year">Paradigm Shift — Declarative Data</p>

    <div className="insight-box">
      <strong>Senior Dev Insight:</strong> RTK Query is NOT state management — it's a 
      <strong> data fetching & caching engine</strong>. You don't write reducers, action types,
      or thunks. You <em>describe</em> your API endpoints, and RTK Query generates
      everything: <strong>hooks, reducers, middleware, caching, revalidation, 
      loading states, and request deduplication</strong>. It's closer to React Query/SWR
      than to traditional Redux.
    </div>

    {/* ── STEP 1: Define API ── */}
    <ConceptSection
      label="Step 1 — Define API (The Only Logic You Write) ⭐"
      description="createApi() is the heart of RTK Query. You define your base URL and endpoints. Each endpoint is either a 'query' (GET) or 'mutation' (POST/PUT/DELETE). RTK Query auto-generates custom hooks, a reducer, and middleware from this single declaration."
    >
      <CodeBlock fileName="apiSlice.js">
{`import { createApi, fetchBaseQuery } 
  from '@reduxjs/toolkit/query/react';

// ⭐ THIS IS ALL THE CODE YOU WRITE.
//   No action types. No action creators.
//   No reducers. No thunks.
//   RTK Query generates EVERYTHING.

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  tagTypes: ['User'],   // for cache invalidation

  endpoints: (builder) => ({
    // Each endpoint = auto-generated hook
    // getUser → useGetUserQuery()
    getUser: builder.query({
      query: (id) => \`/users/\${id}\`,
      providesTags: (result, error, id) => [
        { type: 'User', id },
      ],
    }),
  }),
});

// ⭐ Auto-generated hook!
//   Includes: data, isLoading, isError, 
//   isFetching, refetch, and more.
export const { useGetUserQuery } = apiSlice;`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 2: Store (One-time setup) ── */}
    <ConceptSection
      label="Step 2 — Store (Add reducer + middleware)"
      description="You plug the auto-generated reducer and middleware into the store. The middleware handles caching, polling, and cleanup. This is a one-time setup — you never touch it again."
    >
      <CodeBlock fileName="store.js">
{`import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const store = configureStore({
  reducer: {
    // ⭐ Dynamic reducer path from createApi
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware  // ⭐ Handles caching, 
    ),                     //   invalidation, polling
});`}
      </CodeBlock>
    </ConceptSection>

    {/* ── STEP 3: Component (THE WOW) ── */}
    <ConceptSection
      label="Step 3 — Component (Just. Use. The Hook.) ⭐⭐⭐"
      description="This is the paradigm shift. No useEffect. No dispatch. No manual loading state. You call the hook, pass the argument, and destructure the result. RTK Query handles fetching on mount, caching, deduplication, refetching, and garbage collection."
    >
      <CodeBlock fileName="UserProfile.jsx">
{`import { useGetUserQuery } from './apiSlice';

const UserProfile = () => {
  // ⭐⭐⭐ THAT'S IT. No useEffect. No dispatch.
  //   RTK Query automatically:
  //   ✓ Fetches on mount
  //   ✓ Caches the result
  //   ✓ Deduplicates parallel requests
  //   ✓ Refetches on arg change
  //   ✓ Garbage collects when unmounted
  //   ✓ Shares cache across components

  const { data: user, isLoading, isError, error } 
    = useGetUserQuery(1);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return <p>{user?.name} — {user?.email}</p>;
};`}
      </CodeBlock>
    </ConceptSection>

    {/* ── BONUS: What you get for free ── */}
    <ConceptSection
      label="Bonus — What RTK Query Does Automatically"
      description="All of this behavior is built-in without any extra code from you:"
    >
      <CodeBlock fileName="Built-in Behaviors">
{`// ✓ CACHING
//   If component B requests the same user,
//   NO new network request is made.

// ✓ DEDUPLICATION
//   If 5 components mount and call useGetUserQuery(1)
//   at the same time, only ONE fetch happens.

// ✓ AUTOMATIC REFETCH
//   When a mutation invalidates a tag,
//   ALL queries with that tag refetch.

// ✓ POLLING
const { data } = useGetUserQuery(1, {
  pollingInterval: 30000,  // refetch every 30s
});

// ✓ CONDITIONAL FETCHING
const { data } = useGetUserQuery(id, {
  skip: !id,  // don't fetch if id is null
});

// ✓ CACHE LIFETIME
//   When the last component using a cache entry
//   unmounts, the cache is kept for 60s (default),
//   then garbage collected.`}
      </CodeBlock>
    </ConceptSection>

    <div className="section-divider" />

    <ConceptSection label="Everything You Get">
      <ul className="win-list">
        <li>Zero reducers, zero action types, zero thunks</li>
        <li>Auto-generated hooks per endpoint</li>
        <li>Automatic caching & request deduplication</li>
        <li>Automatic refetch on mutation (tag invalidation)</li>
        <li>Built-in polling, skip, and refetch on focus</li>
        <li>Cache garbage collection on unmount</li>
        <li>TypeScript support out of the box</li>
      </ul>
    </ConceptSection>

    <div className="stats-row">
      <div className="stat-chip">
        <div className="stat-value">2</div>
        <div className="stat-label">Files</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">~25</div>
        <div className="stat-label">Lines</div>
      </div>
      <div className="stat-chip">
        <div className="stat-value">0</div>
        <div className="stat-label">Boilerplate</div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════
const ReduxEvolution = () => {
  return (
    <div className="evo-page">
      <header className="evo-header">
        <h1>The Redux Evolution</h1>
        <p className="subtitle">
          A senior developer's guide to understanding how Redux data fetching evolved — 
          from verbose boilerplate to zero-config declarative hooks.
        </p>
        <div className="use-case">
          📡 Use Case: Fetching User Details by ID
        </div>
      </header>

      <div className="evo-grid">
        <Era1VanillaRedux />
        <Era2ReduxThunk />
        <Era3RTK />
        <Era4RTKQuery />
      </div>

      <footer className="evo-footer">
        <p>
          <strong>Key takeaway:</strong> Each evolution solved a specific pain point. 
          Thunk fixed async in components. RTK fixed boilerplate. RTK Query eliminated 
          manual state management for server data entirely.
        </p>
      </footer>
    </div>
  );
};

export default ReduxEvolution;
