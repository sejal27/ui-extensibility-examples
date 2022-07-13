const axios = require("axios");

/**
 * Main "fetch function": see "webhooks" tab in the official docs:
 * https://developers.hubspot.com/docs/api/crm/extensions/custom-cards
 *
 * Note: for the "sections" config that renders custom components, there's early
 * documenation being gathered in the project repo for now:
 * https://git.hubteam.com/HubSpot/ui-extensibility#shape-of-the-json-payload
 */
exports.main = async (context = {}, sendResponse) => {
  // const { firstname, lastname } = context.propertiesToSend;
  const sections = [
    {
      type: "text",
      format: "markdown",
      text: "Contact loves Tesla. He is planning to gift one to all of his family on his birthday, so look out for more deals",
    },
  ];

  sendResponse({
    sections,
  });
};
