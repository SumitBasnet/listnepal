import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom'
import { Search } from './Search';



const Categories = () => {
	const [category, setCategory] = useState([]);


	useEffect(() => {
		getAllCategory();
	}, [])

	async function getAllCategory() {
		try {
			const categories = await axios.get("https://review.listnepal.com/api/category/?limit=19&page=1")
			setCategory(categories.data.categories)
		}
		catch {
			console.log('something is wrong')
		}
	} 
	return (
		<>
			<Header />
			<div className="container">
			<Search category={category}/>
				<h1 style={{ marginBottom: "20px", textAlign: 'center', marginLeft: '300px' }}>Categories</h1>
				<hr style={{ marginBottom: "20px" }} />
				<div className="box">
					{
						category.map((currElm, indx) => {
							return (
								<Link style={{ textDecoration: "none" }} to={`/${currElm.slug}`}>
									<div className="listbox">
										<p> {currElm.name} </p>
									</div>
								</Link>

							)
						})
					}
				</div>
			</div>

			<Footer />
		</>
	)
}

export default Categories