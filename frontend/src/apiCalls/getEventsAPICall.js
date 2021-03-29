import EventObject from '../typesAndClasses/EventObject.js';

// TODO(me): finish transitioning to the current project
function getAllEvents(userId: string, onLoad:(list: Array<EventObject>) => void): void {
	const  responsePromise: Promise<Response> = fetch('/api/marketplace/getMarketSales/' + userId, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				toast.error(getErrorFromObject(data));
			}
			else {
				const itemsForSale: Array<SaleObject> = [];
				for(const sale of data) {
					if (sale.itemType === 'casus') {
						itemsForSale.push(new SaleObject(
							sale.itemId,
							sale.salePrice,
							sale.amount,
							sale.sellerId,
							sale._id,
							true,
							sale.itemDesc,
							null
						));
					}
					else {
						itemsForSale.push(new SaleObject(
							sale.itemId,
							sale.salePrice,
							sale.amount,
							sale.sellerId,
							sale._id,
							false,
							sale.itemDesc,
							null
						));
					}
				}
				onLoad(itemsForSale);
			}
		})
	);
}

export default getEventsAPICall;