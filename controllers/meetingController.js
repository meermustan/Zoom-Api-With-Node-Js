const express = require("express");
const router = express.Router();
const {createZoomMeeting} = require('../CreateZoomMeeting/createZoomMeeting');

router.get('/',(req, res) => {
	return res.status(200).json({"msg": "Api is working!"});
});

router.post('/create', async(req, res) => {
	const { topic } = req.body || '';
	const { duration } = req.body || 30;
	var { start_time } = req.body || new Date();

	try{
		if(start_time){
			start_time = new Date(start_time);
		}
		const createdMeeting = await createZoomMeeting(topic, duration, start_time);
		return res.status(200).json({"msg": "Meeting created successfully", "meeting": createdMeeting});
	}catch(err){
		return res.status(400).json({msg: err.message});
	}
});

module.exports = router;