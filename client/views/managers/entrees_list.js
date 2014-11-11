Template.entreesList.helpers({

	entrees: function()
	{
		return Foods.find({$and : [{activate: "Y"}, {category: "Entree"}]},{sort: { WebId: 1 } });
	}
});


