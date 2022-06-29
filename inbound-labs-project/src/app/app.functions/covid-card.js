const axios = require('axios');


const CARD_TITLE = "Local Covid Information";

/**
 * Main "fetch function": see "webhooks" tab in the official docs:
 * https://developers.hubspot.com/docs/api/crm/extensions/custom-cards
 *
 * Note: for the "sections" config that renders custom components, there's early
 * documenation being gathered in the project repo for now:
 * https://git.hubteam.com/HubSpot/ui-extensibility#shape-of-the-json-payload
 */
exports.main = async (context = {}, sendResponse) => {
    const {  state, country } = context;

    let sections = []
    if(country !== 'US' || !state){
      sections = [
        {
            "type":"text",
                "format":"markdown",
          "text": "This card **requires** that the contact live to have state/country properties set. Additionally we only currently support providing US based data."
      },
      ];

    }

      const {
        data: { error, message, notes, covid19Site}
    } = await axios.get(`https://api.covidtracking.com/v1/states/${state.toLowerCase()}/info.json`);


    console.log(error,message,notes,covid19Site,country,state);

    if(error){
      sections = [
        {
            "type":"text",
                "format":"markdown",
          "text": `This card experienced an error, ${message}. You can learn more about this api at the [The Covid Tracking Project](https://covidtracking.com/)`
        }
      ];
    }else{
      sections = [
        {
            "type":"text",
                "format":"markdown",
          "text": `**State:** ${state}`
      },
        {
              "type":"text",
                "format":"markdown",
            "text": `**State Notes:** ${notes}`
        },
        {
            "type":"text",
                "format":"markdown",
          "text": `**State's Covid-19 Site:** [${covid19Site}](${covid19Site})`
        }
      ];
    }

    sendResponse({
      sections
    });
};
