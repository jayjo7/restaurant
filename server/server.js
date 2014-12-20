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

			var itemsInCartJay= CartItems.find({session:sessionId});
			console.log ('itemsInCartJay = ' + itemsInCartJay);

			console.log('Number of items in cart for session ' + sessionId
				+ ', user  ' + userId +'= ' + itemsInCartJay.count());

			console.log("Order Object before loop" + JSON.stringify(order, null, 4));

			console.log("+++++++++++++++++++++++++++++++++++++++++++");
			console.log("itemsInCartJay Object before loop" + JSON.stringify(itemsInCartJay, null, 4));

			for(i=0 ; i < itemsInCartJay.count(); i++) {

    			console.log("itemsInCartJay[ " +i + "].product = " + itemsInCartJay[i].product);

    			var product = Foods.find({_id: itemsInCartJay[i].product});
    			console.log("Product Name = " + product.name);


   					items.push({ 
        			"name" : product.name,
        			"qty"  : itemsInCartJay[i].qty

    				});
				}

				console.log("Items  Object" + JSON.stringify(items, null, 4));


				order.items=items;

                console.log("Done Building the Order Object" + JSON.stringify(order, null, 4));

			var itemsToOrder = Orders.insert({ session:sessionId, order:order});



	}


});