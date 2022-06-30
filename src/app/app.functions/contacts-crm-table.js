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

    const sections = [
        {
            "type":"text",
            "format":"markdown",
            "text": "An example of CRM table showing contacts record data."
        },
        {
            "type": "alert",
            "variant": "warning",
            "title": "Contact Out of Office!",
            "body": {
              "type": "text",
              "text": "Use Good Judgement while e-mailing this contact."
            }
          },
        {
            type: 'crm::table',
            objectTypeId: '0-1',
            properties: ['email', 'hubspot_owner_id', 'firstname', 'lastname'],
            pageSize: 3
        }
    ];

    sendResponse({
        sections
    });
};

