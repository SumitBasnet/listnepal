import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { useParams, Link } from 'react-router-dom'
import Modals from '../Components/Modals'

export const ReadMore = ({ description }) => {
	const [isTruncated, setIsTruncated] = useState(true)
	const toggleReadMore = () => {
		setIsTruncated(!isTruncated);
	}
	return (
		<p className="itemDescription">
			{isTruncated ? description?.slice(0, 1000) : description}
			<span onClick={toggleReadMore} className="read-or-hide">
				{isTruncated ? "...read more" : " show less"}

			</span>
		</p>
	)
}

const ContentLists = () => {
	const [itemLists, setitemLists] = useState([]);
	const [itemDetails, setitemDetails] = useState([]);
	const { contentLists } = useParams();
	const { categories } = useParams();
	const [openModel, setOpenModel] = useState(false);
	const [sendTitle, setSendTitle] = useState([])
	const [sendSlug, setSendSlug] = useState([])
	useEffect(() => {
		getListItems();
	}, [])
	async function getListItems() {
		try {
			const items = await axios.get(`https://review.listnepal.com/api/item/${contentLists}/?page=1&limit=2`)
			setitemLists(items.data)
			setitemDetails(items.data.item)
			console.log(items.data.item)
		} catch {
			console.log("something is wrong with the API")
		}
	}
	return (
		<>
			<Header />
			<div className="container">
				<div className="content">
					<h1 style={{ padding: "20px" }}> {itemLists.name}  </h1>
					<hr />
					<ReadMore description={itemLists.description} />

				</div>
				{
					itemDetails.map((currElm, indx) => {
						return (
							<div key={indx} className="contentListItems">
								<div className="image">
									<Link style={{ textDecoration: "none" }} to={`/${categories}/${contentLists}/${currElm.item.slug}`}> <img src={currElm.item.image} alt={currElm.item.title} className="left" /> </Link>
								</div>
								<div className="right">
									<Link style={{ textDecoration: "none" }} to={`/${categories}/${contentLists}/${currElm.item.slug}`}> <h2 style={{ color: 'black' }}>{currElm.item.title}</h2> </Link>
									<hr />
								</div>
								<div className="seperator">
									<p>{currElm.item.body}</p>
								</div>
								<h5 className='headReview'>Rating</h5>
								<h6 className='reviewPoint'>{currElm.rating}</h6>
								<div className="showIcons">
									<Link style={{ textDecoration: "none" }} to={`/${categories}/${contentLists}/${currElm.item.slug}`}> <FontAwesomeIcon icon={faEye} className="icons">   </FontAwesomeIcon> </Link>
									<FontAwesomeIcon icon={faHeart} onClick={() => { setOpenModel(true); setSendTitle(currElm.item.title); setSendSlug(currElm.item.slug) }} className="icons"></FontAwesomeIcon>
									<FontAwesomeIcon icon={faShareNodes} className="icons"></FontAwesomeIcon>
								</div>
							</div>
						)
					})
				}
				<Modals show={openModel} onHide={() => setOpenModel(false)} sendtitles={sendTitle} sendSlug={sendSlug} />
			</div>
			<Footer />
		</>

	)
}

export default ContentLists