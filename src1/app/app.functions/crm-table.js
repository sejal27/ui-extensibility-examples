const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {

    const sections = [
        {
            "type":"text",
            "format":"markdown",
            "text": "An example of a simple CRM table with **contact** data"
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
