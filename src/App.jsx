import { useState } from 'react'
import Navigation from './components/Navbar'
import Topbar from './components/Hader'
// import Getdata from './admin/Getdata'
import Postdata from './admin/Postdata'

function App() {

  return (
    <>
    <Topbar />
    <Navigation />
    {/* <Getdata/> */}
    <Postdata/>
    </>
  )
}

export default App
