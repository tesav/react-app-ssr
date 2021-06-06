import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../components/Nav'
import { pageServerCallback, pageServerCallbackUses } from '../app'
import apiTest from '../api/test'
import { pending, success, error } from '../store/slices/test'

const Home = ({ ...rest }) => {

  const stateData = useSelector((state) => state.test.data)
  const dispatch = useDispatch()

  return (
    <div>
      <Nav />
      <p>props: {JSON.stringify(rest, null, true)}</p>
      <br />
      <div>
        <p>stateData: {JSON.stringify(stateData, null, true)}</p>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(success(123))}
        >
          dispatch test data 1
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(success(321))}
        >
          dispatch test data 2
        </button>
      </div>
    </div>
  )
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const serverAction = ({ store, match }) => {

  const location = useLocation()

  return apiTest('api/test')
    .then(data => {
      store.dispatch(success({ ...data, match }))
    })
}

export default pageServerCallbackUses(serverAction,
  Home
)

