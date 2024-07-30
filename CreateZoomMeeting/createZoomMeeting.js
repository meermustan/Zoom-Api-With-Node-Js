const axios = require("axios");
const api_base_url = "https://api.zoom.us/v2"; // base url for zoom api call

// config as a auth required for auth login;
let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
    headers: {
        'Content-Type': 'application/json',
    },
    auth:{
        username: process.env.ZOOM_CLIENT_ID,
        password: process.env.ZOOM_CLIENT_SECRET,
    },
};

// function to create a zoom meeting, it's requires 3 parameters (topic as String, duratioin as Numbers, start_time as Date)
exports.createZoomMeeting = async (topic, duration, start_time) => {
    try{
        let authResponse
        await axios.request(config)
            .then((response) => {
                authResponse = response.data;
            })
            .catch((error) => {
                console.log(error);
            });

            const access_token = authResponse.access_token

        const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }


        let data = JSON.stringify({
            "topic": topic,
            "type": 2,
            "start_time": start_time,
            "duration": duration,
            "timezone":"Pakistan",
            "settings": {
                "allow_multiple_devices": true,
                "join_before_host": true,
                "waiting_room": false
            }
        });

        const meetingResponse = await axios.post(`${api_base_url}/users/me/meetings`, data, { headers });

        if (meetingResponse.status !== 201) {
            return 'Unable to generate meeting link'
        }

        const response_data = meetingResponse.data;

        const content = {
            meeting_url: response_data.join_url,
            meetingTime: response_data.start_time,
            purpose: response_data.topic,
            duration: response_data.duration,
            message: 'Success',
            status: 1,
        };

        return content

    }catch (e) {
        return e
    }
}