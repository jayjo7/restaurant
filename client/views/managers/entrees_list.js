Template.entreesList.helpers({

	entrees: function()
	{
		return Foods.find({$and : [{Activate: "Y"}, {Category: "Entree"}]},{sort: { WebId: 1 } });
	}
		,

    currency: function(num)
    {
        return '$' + Number(num).toFixed(2);
    }
});


