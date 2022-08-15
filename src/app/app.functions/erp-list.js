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
	const sections = [
		{ "type": "alert",
		"title": "Account balance is in good standing",
		"body": {
		  "type": "text",
		  "text": "No action is needed at this time"}
		},
		{
			"type": "descriptionList",
			"items": [
			{
				"label": "Account link",
				"value": {
					"type": "text",
					"format": "markdown",
					"text": "[View in Netsuite](https://system.netsuite.com/pages/customerlogin.jsp)"
				}
				},
			  {
				"label": "Company name",
				"value": "Hobbs Group"
			  },
			  {
				"label": "Next billing date",
				"value": {
				  "type": "text",
				  "text": "September 1, 2022"
				}
			  }, 
			  {
				"label": "Total account balance",
				"value": {
				  "type": "text",
				  "text": "USD −6,569.93"
				}
			  },
			  {
				"label": "Total credit balance",
				"value": {
				  "type": "text",
				  "text": "USD 6,569.93"
				}
			  },
			  {
				"label": "Open invoices",
				"value": {
				  "type": "text",
				  "text": "None"
				}
			  }
			],
			
		},
	];

	sendResponse({
		sections,
	});
};
