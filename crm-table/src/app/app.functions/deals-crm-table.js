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
            "text": "A table using UI Extensbility 'sections'"
        },
        {
            "type": "button",
            "text": "Contacts",
            "onClick": {
                "type": "SERVERLESS_ACTION_HOOK",
                "serverlessFunction": "contactsCrmTable"
              }
        },
        {
            "type": "button",
            "text": "Deals",
            "onClick": {
                "type": "SERVERLESS_ACTION_HOOK",
                "serverlessFunction": "dealsCrmTable"
              }
        },
        {
            type: 'crm::table',
            objectTypeId: '0-3',
            properties: ['dealname', 'hs_closed_amount_in_home_currency', 'dealstage', 'closedate', 'hubspot_owner_id'],
            pageSize: 3
        }
    ];

    sendResponse({
        sections
    });
};
