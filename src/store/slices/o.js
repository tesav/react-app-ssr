
export default {
  // name: 'test',
  initialState: {
    pending: false,
    data: null,
    error: null,
  },
  reducers: {
    pending: (state) => {
      state.pending = true
      state.data = null
      state.error = null
    },

    success: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.pending = true
      state.data = action.payload
      state.error = null
    },
    error: (state) => {
      state.pending = false
      state.data = null
      state.error = action.payload
    },
  },
}