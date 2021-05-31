import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'

const Home = ({ initialText, changeText, staticContext, ...rest }) => (
  <div>
    <Nav />
    <p>{JSON.stringify(rest)}</p>
    {/* <p>data: {staticContext && staticContext.data}</p> */}
    <p>{initialText}</p>
    <button onClick={changeText}>change text!</button>
  </div>
)

// class Home extends React.PureComponent {

//   render() {

//     const { initialText, changeText, staticContext } = this.props

//     return (
//       <div>
//         <Nav />
//         {/* {console.log(staticContext)} */}
//         <p>{initialText}</p>
//         <button onClick={changeText}>change text!</button>
//       </div>
//     )
//   }
// }

Home._serverLoad = /*async*/ (parsedUrl, matchRoute) => {
  // console.log(parsedUrl)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'test!!!' })
      //reject(777)
    }, 300)
  })
}

const mapStateToProps = ({ initialText }) => ({
  initialText,
})

const mapDispatchToProps = (dispatch) => ({
  changeText: () => dispatch({ type: 'CHANGE_TEXT' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
