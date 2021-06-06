import { createSlice } from '@reduxjs/toolkit'

import pendingSuccessError from './pendingSuccessError'

export const test = createSlice({ ...pendingSuccessError, name: 't2' })

// Action creators are generated for each case reducer function
export const { pending, success, error } = test.actions

export default test.reducer