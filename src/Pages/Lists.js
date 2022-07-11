import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { Link, useParams } from 'react-router-dom';

const Lists = () => {
	const [contentdata, setcontentData] = useState([]);
	const [titles, setTitles] = useState([]);
	const { categories } = useParams();


	useEffect(() => {
		getContentData();
	}, [])

	async function getContentData() {
		try {
			const datas = await axios.get(`https://review.listnepal.com/api/list/${categories}?limit=5&page=1`)
			setcontentData(datas.data.lists)
			setTitles(datas.data)
		} catch {
			console.log("something is wrong")
		}
	}
	return (
		<>
			<Header />
			<div className="container">
				<h1 style={{ marginBottom: "20px", textAlign: 'center' }}>{titles.categoryName}</h1>
				<hr />
				{
					contentdata.map((currElm, indx) => {
						return (
							<Link style={{textDecoration:"none"}} to={`/${titles.slug}/${contentdata[indx].slug}`}>
								<div key={indx} className="Contentbox">
									<h2>{currElm?.name}</h2>
									<p className='description'>{currElm?.description}</p>
								</div>
							</Link>
						)
					})
				}


			</div>
			<Footer />
		</>
	)
}

export default Lists