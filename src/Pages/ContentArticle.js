import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContentArticle = () => {
	const [articleData, setArticleData] = useState([]);
	const [standing, setStanding] = useState([]);
	const { contentarticle } = useParams();
	const { categories } = useParams();

	useEffect(() => {
		getArticleData();
	}, [])

	async function getArticleData() {
		try {
			const Datas = await axios(`https://review.listnepal.com/api/item/?item=${contentarticle}`)
			setArticleData(Datas.data)
			setStanding(Datas.data[0].standings)
		} catch {
			console.log('somehthing is wrong')
		}

	}
	return (
		<>
			<Header categories={categories}/>
			<div className="container">
				<div className="ArticleContent">
					<div className="Heading">
						<img src={articleData[0]?.item?.image} alt={articleData[0]?.item?.title} className='articleImg' />
						<h2 className='hedingArticle'> {articleData[0]?.item?.title}  </h2>
						<hr />
					</div>
					<div className="ArticleBody">
						<p className='articleDesc'>{articleData[0]?.item?.body}</p>
					</div>
				</div>
				<div className="standing">
					<h1>#Standing and Ratings</h1>
					<hr />
				</div>
				{
					standing.map((currElm, indx) => {
						return (
							<Link style={{ textDecoration: "none" }} to={`/${categories}/${currElm.listSlug}`}>
								<div className="Ranking">
									<div className="rank-pos">
										{currElm?.position}
									</div>
									<div className="standing-topic">
										<h2> {currElm?.list}</h2>
									</div>
									<div className="rating">
										<div className='numbrRate'>
											{currElm?.rating}
										</div>
									</div>
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

export default ContentArticle