Template.desertsList.helpers({

	deserts: function()
	{
		return Foods.find({$and : [{Activate: "Y"}, {Category: "Desert"}]},{sort: { WebId: 1 } });
	}
});


