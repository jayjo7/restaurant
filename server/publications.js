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
	
	
	
	


