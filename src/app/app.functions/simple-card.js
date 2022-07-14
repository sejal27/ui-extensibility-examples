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
        {
            "type": "text",
            "format": "markdown",
            "text": "**All Contacts**"
        },
        {
            type: 'crm::table',
            objectTypeId: '0-1',
            properties: ['firstname', 'lastname', 'email'],
            pageSize: 3
        }, 
    ];

    sendResponse({
        sections
    });
};
