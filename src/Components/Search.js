import React from 'react'
import SearchClient from './SearchClient';
function Search() {
  return (
    <section className='ctn-search'>
      <div className='search'>
        <h1>Buscar Cliente</h1>
        <div className='ctn-form-search'>
          <SearchClient></SearchClient>
        </div>
      </div>
    </section>
  )
}

export default Search;