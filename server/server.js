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
			order.sessionId =sessionId;
			order.user=userId
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

			order.totalItemCount = totalItemCount;	
			order.subTotal = subTotal;
			order.total = Number((subTotal + subTotal * .092).toFixed(2));


			order.items=items;

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
						return order.items;
					}
				});

	}
});