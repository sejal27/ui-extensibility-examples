exports.main = async (sendResponse) => {
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
