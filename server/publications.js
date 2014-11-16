Meteor.publish('foods', function(){
	return Foods.find({activate: "Y"},{sort: { webid: 1 } });
	}
	);	
	
Meteor.publish('homes', function(){
	return Homes.find({activate: "Y"},{sort: { webid: 1 } });
	}
	);	
	
Meteor.publish('foodCategories', function(){
	return FoodCategories.find({activate: "Y"},{sort: { webid: 1 } });
	}
	);		
	

	
	
	
	


