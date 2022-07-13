const axios = require('axios');


/**
 * Main "fetch function": see "webhooks" tab in the official docs:
 * https://developers.hubspot.com/docs/api/crm/extensions/custom-cards
 *
 * Note: for the "sections" config that renders custom components, there's early
 * documenation being gathered in the project repo for now:
 * https://git.hubteam.com/HubSpot/ui-extensibility#shape-of-the-json-payload
 */
exports.main = async (context = {}, sendResponse) => {
    // const {
    //     data: { message }
    // } = await axios.get("https://dog.ceo/api/breeds/image/random");

    // const {
    //     data: { fact }
    // } = await axios.get("https://catfact.ninja/fact");

    const sections = [
       
        {
            "type":"text",
            "format":"markdown",
            "text": "**Like cats more? Here's some interesting cat fact for today!**"
        },
        
    ];

    sendResponse({
        sections
    });
};
