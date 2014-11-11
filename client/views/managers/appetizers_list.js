Template.appetizersList.helpers({

	appetizers: function()
	{
		return Foods.find({$and : [{activate: "Y"}, {category: "Appetizer"}]},{sort: { WebId: 1 } });
	}
});


