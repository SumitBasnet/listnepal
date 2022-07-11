import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import CustomizedSnackbars from './SucessMessage';


const Modals = (props) => {
	const [name, setName] = useState("")
	const [review, setReview] = useState("")
	const [allEntry, setAllEntry] = useState({})
	const { contentLists } = useParams()
	const [rate, setRate] = useState(0)
	const minm = 100000000000;
	const maxm = 999999999999;
	const [success, setSuccess] = useState(false)
	const [message, setMessage] = useState('')
	async function sendAllData(e) {
		try {
			const datas = {
				"list": contentLists, "item": props.sendSlug, "name": name, "comment": review, "rating": rate, "visitorId": Math.floor(Math
					.random() * (maxm - minm + 1)) + minm
			}
			setAllEntry(datas)
			console.log(datas)
			const response = await axios.post(`https://review.listnepal.com/api/review`, datas)
			console.log(response)
			if (response.status === 200) {
				setName("")
				setReview("")
				setRate()
				setMessage(response.data.message)
				setSuccess(true)
			}
		}
		catch {
			console.log("something is wrong in the post")
		}
		setSuccess(false);

	}
	return (
		<>
			<CustomizedSnackbars open={success} hide={() => setSuccess(false)} message={message} />
			<Modal {...props} size="lg">
				<Modal.Header closeButton>
					<Modal.Title> {props.sendtitles}
						<div className="rate">
							<Rating
								defaultValue={0}
								max={5}
								precision={0.5}
								value={rate}
								size="large"
								onChange={(event, newValue) => {
									setRate(newValue);
								}} />
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Name"
								onChange={(e) => { setName(e.target.value) }}
								autoFocus
								value={name}
								autoComplete='off'
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Review</Form.Label>
							<Form.Control as="textarea" rows={6}
								onChange={(e) => { setReview(e.target.value) }} value={review} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button type='submit' variant="primary" onClick={(e) => sendAllData(e)}>
						Post
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Modals