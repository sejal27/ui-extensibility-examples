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
		{
			type: "statistics",
			items: [
				{
					label: "Views",
					number: "347",
					description: {
						type: "trend",
						value: "23.36%",
						direction: "increase",
					},
				},
				{
					label: "Total Submissions",
					number: "45",
					description: {
						type: "trend",
						value: "9.25%",
						direction: "decrease",
					},
				},
			],
		},
	];

	sendResponse({
		sections,
	});
};
