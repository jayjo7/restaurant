Template.entreesList.helpers({

	entrees: function()
	{
		return Foods.find({$and : [{Activate: "Y"}, {Category: "Entree"}]},{sort: { WebId: 1 } });
	}
});


