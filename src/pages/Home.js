import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'
import { pageServerCallback } from '../utils/ssr'

const Home = ({ initialText, changeText, staticContext, ...rest }) => (
  <div>
    <Nav />
    <p>{JSON.stringify(rest, null, true)}</p>
    {/* <p>data: {staticContext && staticContext.data}</p> */}
    <p>{initialText}</p>
    <button onClick={changeText}>change text!</button>
  </div>
)

const mapStateToProps = ({ initialText }) => ({
  initialText,
})

const mapDispatchToProps = (dispatch) => ({
  changeText: () => dispatch({ type: 'CHANGE_TEXT' }),
})

const serverAction = params => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      //console.log(params)
      resolve({ data: 'test!!!' })
      //reject(777)
    }, 300)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(
  pageServerCallback(serverAction,
    Home
  )
)
