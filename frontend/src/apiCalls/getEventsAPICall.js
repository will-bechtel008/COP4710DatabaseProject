// import EventObject from '../typesAndClasses/EventObject.js';

// // TODO(me): finish transitioning to the current project
// function getAllEvents(userId: string, onLoad:(list: Array<EventObject>) => void): void {
// 	const  responsePromise: Promise<Response> = fetch('/api/events/getEvents/' + userId, {
// 		method: 'GET',
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
// 			'Content-Type': 'application/json',
// 			'Access-Control-Allow-Credentials': 'true',
// 		},
// 	});
// 	responsePromise.then(
// 		response => response.json().then(data => {
// 			if (response.status !== 200) {
// 				console.log(response.status);
// 				console.log(data);
// 			}
// 			else {
// 				const eventsToDisplay: Array<EventObject> = [];
// 				for(const event of data) {
// 						itemsForSale.push(new EventObject(
// 							event.name,
// 							event.date,
// 							event.org,
// 							event.location,
// 							event.comments
// 						));
// 				}
// 				onLoad(eventsToDisplay);
// 			}
// 		})
// 	);
// }

// export default getEventsAPICall;