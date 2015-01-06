Meteor.methods({

	addToCart:function(qty, product, session){
		if(qty>0){
			CartItems.insert({qty:qty, product:product, session:session});
			console.log('Added the session = ' + session);
			console.log('Added the product = ' + product);
		}else{
			console.log('Quantity is Zero');
		}
	},
	removeCartItem:function(id){
		CartItems.remove({_id:id});
	},
		removeAllCartItem:function(sessionId){
		CartItems.remove({session:sessionId});
	},

	orderItems:function(sessionId, userId){

			//console.log('sessionId= ' + sessionId);
			//console.log('userId= ' + userId);
			var order = {};
			order.orderedAt = new Date();
			order.status='new';
			order.progress='Just Received';

			order.user=userId.emails[0].address;
			var items=[];

			//console.log("Order Object before loop" + JSON.stringify(order, null, 4));

			var itemsInCart= CartItems.find({session:sessionId});

			console.log('Number of items in cart for session ' + sessionId
				+ ', user  ' + userId.emails[0].address +' = ' + itemsInCart.count());

			var totalItemCount = 0;
			var subTotal = 0;

			itemsInCart.forEach (function (cartitems)

				{
					totalItemCount += Number(cartitems.qty);


					//console.log("cartitems.product = " + cartitems.product);
					var product = Foods.findOne({_id: cartitems.product});
    				//console.log("Product Name = " + product.Name);

					subTotal +=  (Number(product.Charge) * cartitems.qty);

   					items.push(
   					{ 
        				"name" : product.Name,
        				"qty"  : cartitems.qty
					});

   			});
			order.items=items;
			order.totalItemCount = totalItemCount;	
			order.subTotal = Number (subTotal.toFixed(2));
			order.total = Number((subTotal + subTotal * .092).toFixed(2));

			order.sessionId =sessionId;



            console.log("Done Building the Order Object" + JSON.stringify(order, null, 4));

			var itemsToOrder = Orders.insert({order:order}, function(error, _id)
				{

					if(error)
					{
						config.log("touble insert the order to mongodb " + order);
						throw new Meteor.Error(error);

					}
					else
					{
						Meteor.call('removeAllCartItem',sessionId);
						try{

							var https = Meteor.npmRequire('request');
							var options ={
								url:'https://script.google.com/macros/s/AKfycbwl0v0pHtBbwPHFy54QnHok5KpkHUVXnRO98sN_GzVPZ0pCdYu2/exec',
								method: 'POST',
								body: order,
								json: true,
								followAllRedirects: true

							}
						    https.post(options, function (error, response, body){
								console.log("error : " + error);
								console.log("response.statusCode : " + response.statusCode);
								console.log("body : " + body);

							});
							//var result = HTTP.call(	'POST', 
							//						'https://script.google.com/macros/s/AKfycbzu3126b_QhgPwuwoStDdoF8AVqf2XFfAQ-ars_YmR7SEZgeSc/exec',
                           	//						{ data:order, followRedirects:true }
                           	//					);
							//var result = HTTP.call('GET', 'https://script.google.com/macros/s/AKfycbzu3126b_QhgPwuwoStDdoF8AVqf2XFfAQ-ars_YmR7SEZgeSc/exec');
							//console.log("result = " + result);
							//for (var key in result)
							//{
							//
							//	console.log("key = " +  key + " : " + result[key]);
							//}
						}catch (e)
						{
							console.log(e);
						}
						//return order.items;
					}
				});

	}
});