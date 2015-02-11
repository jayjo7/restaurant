Template.entreesList.helpers({

	entrees: function()
	{
		//return Foods.find({$and : [{Activate: "Y"}, {Category: "Entree"}]},{sort: { WebId: 1 } });

		return Menu.find({Category: "Entree"});

	}
		,

    currency: function(num)
    {
        return '$' + Number(num).toFixed(2);
    },
    
    isAvailable:function(fontLine)
	{
		//console.log("Availability = " + Availability);
		if('line-through' === fontLine)
			return  'SoldOut';
		else
			return ''
	}
});


