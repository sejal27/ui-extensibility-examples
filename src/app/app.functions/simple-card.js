const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
    const {firstname} = context.propertiesToSend;
    const sections = [
       
        {
            "type":"text",
            "format":"markdown",
            "text": firstname + " Loves Tesla!**"
        },
        
    ];

    sendResponse({
        sections
    });
};
