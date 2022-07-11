import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from './Search'

const Header = (props) => {
	const categories = props.category
	return (
		<>
			<header>
				<Link style={{ textDecoration: "none" }} to="/"><label htmlFor="" className="headName">ListNepal Review</label> </Link>
				
			</header>


		</>
	)
}

export default Header
