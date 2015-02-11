Meteor.publish('menu', function(){
	//return Foods.find({Activate: "Y"},{sort: { WebId: 1 } });
	return Menu.find();
	}
	);	

Meteor.publish('homes', function(){
	return Homes.find({Activate: "Y"},{sort: { WebId: 1 } });
	}
	);	
	

Meteor.publish('cartItems', function(sessid){

	console.log("In Publish: sessid " + sessid );

	return  CartItems.find({session: sessid });

	}
	);	


Meteor.publish('ordereditems', function(UniqueId){

	console.log("In Publish (OrderedItems): UniqueId " + UniqueId );
 
	return  OrderedItems.find({UniqueId: UniqueId });

	}
	);	
	
	
	Meteor.publish('orders', function(){
	//return Foods.find({Activate: "Y"},{sort: { WebId: 1 } });
	console.log("Count Order = " + Orders.find().count());
	return Orders.find();
	}
	);	
	


