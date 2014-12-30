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

			console.log('sessionId= ' + sessionId);
			console.log('userId= ' + userId);
			var order = {};
			order.orderedAt = new Date();
			order.status="new";
			progress="new";
			var items=[];

			console.log("Order Object before loop" + JSON.stringify(order, null, 4));

			var itemsInCart= CartItems.find({session:sessionId});

			console.log('Number of items in cart for session ' + sessionId
				+ ', user  ' + userId +'= ' + itemsInCart.count());

			itemsInCart.forEach (function (cartitems)

				{

					console.log("cartitems.product = " + cartitems.product);
					var product = Foods.findOne({_id: cartitems.product});
    				console.log("Product Name = " + product.Name);

   					items.push(
   					{ 
        				"name" : product.Name,
        				"qty"  : cartitems.qty
					});

   			});

			order.items=items;

            console.log("Done Building the Order Object" + JSON.stringify(order, null, 4));

			var itemsToOrder = Orders.insert({ session:sessionId, order:order}, function(error, _id)
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