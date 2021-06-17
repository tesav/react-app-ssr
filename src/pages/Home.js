import React from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import { sleep, pageServerCallback, pageServerCallbackUses } from '../app'

const Home = ({ ...rest }) => {
  return (
    <div>
      <Nav />
      <p>props: {JSON.stringify(rest, null, true)}</p>
    </div>
  )
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const serverAction = async ({ store, match }) => {

  const location = useLocation()

  await sleep(100)
  return { test: 123, location }
}

export default pageServerCallbackUses(serverAction,
  Home
)

