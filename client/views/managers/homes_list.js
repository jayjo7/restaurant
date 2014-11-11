Template.homesList.helpers({

	homes: function()
	{
		return Homes.find({},{sort: { WebId: 1 } });
	}
});

