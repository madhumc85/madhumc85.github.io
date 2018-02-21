	
	var aaGoogleAnlyticalJsonData;
	
	<!-- *******************  Google Anylytics starts here ********************** -->
		
	// Replace with your view ID.
	var VIEW_ID = '169860540';

	// Query the API and print the results to the page.
	function queryReports() {
		gapi.client.request({
			path : '/v4/reports:batchGet',
			root : 'https://analyticsreporting.googleapis.com/',
			method : 'POST',
			body : {
				reportRequests : [ {
					viewId : VIEW_ID,
					dateRanges : [ {
						startDate : '7daysAgo',
						endDate : 'today'
					} ],
					dimensions: [
						{
							name: 'ga:eventLabel'
						}
					],
					metrics: [
						{
							expression: 'ga:totalEvents',
						}
					],
					filtersExpression: 'ga:eventCategory==formsubmit,ga:eventAction==submit',
				} ]
			}
		}).then(displayResults, console.error.bind(console));
	}

	function displayResults(response) {
		var formattedJson = JSON.stringify(response.result, null, 2);
		aaGoogleAnlyticalJsonData = JSON.parse(formattedJson);
		extractGoogleAnalyticaldata(aaGoogleAnlyticalJsonData);
		//document.getElementById('query-output').innerHTML = formattedJson;
	}

	<!-- *******************  Google Anylytics ends here ********************** -->
	
	
	
	
	
	
	
	<!-- *******************  Json parsing starts here ********************** -->
	

	var filteredAnalyticalDataForDisplay = [];

	function extractGoogleAnalyticaldata(aaGoogleAnlyticalJsonData) {
		if (aaGoogleAnlyticalJsonData.reports !== undefined) {
			if (aaGoogleAnlyticalJsonData.reports[0] !== undefined && aaGoogleAnlyticalJsonData.reports[0].data) {
				filterDimensionsAndRows(aaGoogleAnlyticalJsonData.reports[0].data.rows);
			}
		}
	}
	
	function putInDisplayPopup() {
		var consolidatedMessage;
		for(index=0: index >= filteredAnalyticalDataForDisplay.lenght; index++) {
			consolidatedMessage = filteredAnalyticalDataForDisplay[0].origin + "-->" 
				+ filteredAnalyticalDataForDisplay[0].destination + " number of searches are" 
				+ filteredAnalyticalDataForDisplay[0].noOfHits;
		}
		document.getElementById('popupDisplayData').innerHTML = formattedJson;filteredAnalyticalDataForDisplay[0].clientId 
			+ " "
			+ "your travel history as below"
			+ " "
			+ consolidatedMessage;
	} 

	function filterDimensionsAndRows(rows) {
		for (rowIndex = 0; rowIndex < rows.length; rowIndex++) {
			collectValidData(rows[rowIndex].dimensions[0], rows[rowIndex].metrics[0].values[0]);
		}
	}

	function collectValidData(dimensions, metricsValue) {
		var realTimeData = dimensions.split("~");
		if (realTimeData.length === 3) {
			filteredAnalyticalDataForDisplay.push({
				clientId: realTimeData[0],
				origin: realTimeData[1],
				destination: realTimeData[2],
				noOfHits: metricsValue
			});
		}
	}

	
	/*function getValidUserHits() {
		var htmlClientId = "191524008.1518775248"; // document.getElementById("").value;
		var htmlOrigin = "AAT"; //document.getElementById("").value;
		var htmlDestination = "BBT"; //document.getElementById("").value;
		return filteredAnalyticalDataForDisplay.filter(function (element) {
				return element.clientId === htmlClientId
					&& element.origin === htmlOrigin
					&& element.destination === htmlDestination;
			}
		);
	}*/

	
	<!-- *******************  Json parsing ends here ********************** -->