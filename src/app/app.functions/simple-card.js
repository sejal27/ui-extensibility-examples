const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
    const {firstname} = context.propertiesToSend;
    const sections = [
       
        {
            "type":"text",
            "format":"markdown",
            "text": firstname + " Loves Tesla!**"
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
            properties: ['email', 'hubspot_owner_id', 'firstname', 'lastname'],
            pageSize: 3
        }, 
    ];

    sendResponse({
        sections
    });
};
