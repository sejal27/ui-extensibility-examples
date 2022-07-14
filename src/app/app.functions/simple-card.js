const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
    const {firstname} = context.propertiesToSend;
    const sections = [
       
        {
            "type":"text",
            "format":"markdown",
            "text": "This contact loves Tesla!**"
        },
        {
            "type": "divider",
            "distance": "small"
        },
    ];

    sendResponse({
        sections
    });
};
