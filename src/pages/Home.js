import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../components/Nav'
import { pageServerCallback } from '../app'
import apiTest from '../api/test'
import { pending, success, error } from '../store/slices/test'

const Home = ({ initialText, staticContext, ...rest }) => {

  const data = useSelector((state) => state.aaa.data)
  const dispatch = useDispatch()

  return (
    <div>
      <Nav />
      <p>{JSON.stringify(rest, null, true)}</p>
      <p>staticContext: {JSON.stringify(staticContext)}</p>
      <p>{initialText}</p>
      {/* <button onClick={changeText}>change text!</button> */}
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(success(123))}
        >
          Increment
        </button>
        <span>{JSON.stringify(data, null, true)}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(success(321))}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

const serverAction = ({ store }) => {
  return apiTest('aaaa/bbbbb')
    .then(data => {
      store.dispatch(success(data))
    })
}

export default pageServerCallback(serverAction,
  Home
)

