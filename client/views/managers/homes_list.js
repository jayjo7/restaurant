Template.homesList.helpers({

	homes: function()
	{
		return Homes.find({},{sort: { webid: 1 } });
	}
});

