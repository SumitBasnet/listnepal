import React from 'react'
import './App.css'
import Categories from './Components/Categories'
import Lists from './Pages/Lists'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContentLists from './Pages/ContentLists'
import ContentArticle from './Pages/ContentArticle'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomizedSnackbars from './Components/SucessMessage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Categories />} />
          <Route path='/:categories' element={<Lists />}>
          </Route>
          <Route path='/:categories/:contentLists' element={<ContentLists />}></Route>
          <Route path='/:categories/:contentLists/:contentarticle' element={<ContentArticle />}></Route>
        </Routes>
      </Router>
      {/* <CustomizedSnackbars /> */}
    </>
  )
}

export default App
