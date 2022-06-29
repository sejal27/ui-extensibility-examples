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
            "text": "This uses the Reporting Platform to display an existing report within HubSpot through the use of  UI Extensbility 'sections'."
        },

        {
            type: 'crm::report',
            reportId: 4156101
        }
    ];

    sendResponse({
        sections
    });
};
