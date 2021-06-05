import { createSlice } from '@reduxjs/toolkit'

import o from './o'

export const test = createSlice({ ...o, name: 't' })

// Action creators are generated for each case reducer function
export const { pending, success, error } = test.actions

export default test.reducer