Template.desertsList.helpers({

	deserts: function()
	{
		return Foods.find({$and : [{activate: "Y"}, {category: "Desert"}]},{sort: { webid: 1 } });
	}
});


