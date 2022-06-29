const axios = require("axios");

function logInputValue(formState, formName) {
	console.log(
		`The '${formName}' input had the value: ${
			formState[formName] ? formState[formName] : null
		}`
	);
}

/**
 * Main "fetch function": see "webhooks" tab in the official docs:
 * https://developers.hubspot.com/docs/api/crm/extensions/custom-cards
 *
 * Note: for the "sections" config that renders custom components, there's early
 * documenation being gathered in the project repo for now:
 * https://git.hubteam.com/HubSpot/ui-extensibility#shape-of-the-json-payload
 */
exports.main = async (context = {}, sendResponse) => {
	// For testing passing of FE form state.
	console.log("context.state", context.state);
	console.log("context.propertiesToSend", context.propertiesToSend);
	console.log("context.formState", context.formState);

	logInputValue(context.formState, "hello");
	logInputValue(context.formState, "testing");
	logInputValue(context.formState, "nested-input");

	const sections = [
		{
			type: "form",
			submitButtonText: "Test",
			body: [
				{
					type: "input",
					name: "testing",
					inputType: "text",
					label: "testing Input",
				},
				{
					type: "input",
					name: "hello",
					inputType: "text",
					label: "hello Input",
				},
				{
					type: "tile",
					body: [
						{
							type: "input",
							name: "nested-input",
							inputType: "text",
							label: "Nested Input",
						},
						{
							type: "text",
							format: "markdown",
							text: "some **very** _related_ content with a [link](https://www.hubspot.com/)",
						},
					],
				},
			],
		},
	];

	sendResponse({
		sections,
	});
};
