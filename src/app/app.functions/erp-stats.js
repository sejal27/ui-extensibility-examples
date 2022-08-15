const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
	const sections = [
		{
			"type": "statistics",
			"items": [
				{
					"label": "Views",
					"number": "347",
					"description": {
						"type": "trend",
						"value": "23.36%",
						"direction": "increase"
					}
				},
				{
					"label": "Total Submissions",
					"number": "45",
					"description": {
						"type": "trend",
						"value": "9.25%",
						"direction": "decrease"
					}
				}
			]
		}
	];

	sendResponse({
		sections,
	});
};
