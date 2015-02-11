Template.desertsList.helpers({

	deserts: function()
	{
		//return Foods.find({$and : [{Activate: "Y"}, {Category: "Desert"}]},{sort: { WebId: 1 } });
		return Menu.find({Category: "Desert"});
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


