import React from 'react'
import { Search } from '../Components'
import '../Assets/Components/Search.css'
import { Outlet } from 'react-router-dom'

function SearchPage() {
  return (
    <>
      <Search/>
      <Outlet/>
    </>
    )
}

export default SearchPage