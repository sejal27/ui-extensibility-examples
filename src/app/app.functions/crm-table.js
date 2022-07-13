const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {

    const sections = [
        {
            "type":"text",
            "format":"markdown",
            "text": "An example of a simple CRM table with **contact** data"
        },
    ];

    sendResponse({
        sections
    });
};
