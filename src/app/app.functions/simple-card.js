const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
    const {firstname} = context.propertiesToSend;
    const sections = [
        {
            "type": "text",
            "text": "Brian loves Tesla."
          } 
        
    ];

    sendResponse({
        sections
    });
};
