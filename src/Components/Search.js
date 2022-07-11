import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const Search = (props) => {
	const [query, setQuery] = useState([]);
	const handleFilter = (event) => {
		const searchword = event.target.value
		const newFilter = props.category.filter((value) =>{
			return value.name.toLowerCase().includes(searchword.toLowerCase());
			
		})
		console.log(newFilter)
		setQuery(newFilter)
	}
	return (
		<>
		<div className="search_box">
					<input type="text" 
					id='search' 
					className='input' 
					placeholder='Search...' 
					onChange={handleFilter} 
					autoComplete='off'/>
					<div className="btn btn_common">
						<FontAwesomeIcon icon={faSearch} className="faSearch" />
						</div>
						{
							query.length != 0 && (
						<div className="dataResult">
						{
							query.map((currElm,indx) => {
								return(
										<Link style={{ textDecoration: "none" }} to={`/${currElm.slug}`}>
										<div className="titleitems">
										<p className='dataItem' target="_blank">
										{currElm.name} 
										</p> 
										<hr /> 
										</div> 
										</Link>
								)
							})
						}
					</div>
					)
					}
					
					</div>
					
		</>
	)
}
