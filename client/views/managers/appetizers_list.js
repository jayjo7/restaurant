Template.appetizersList.helpers({

	appetizers: function()
	{
		//return Foods.find({$and : [{Activate: "Y"}, {Category: "Appetizer"}]},{sort: { WebId: 1 } });
		return Menu.find({Category: "Appetizer"});
	}
	,

    currency: function(num)
    {
        return '$' + Number(num).toFixed(2);
    }
});


