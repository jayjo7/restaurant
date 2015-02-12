Template.appetizersList.helpers({

	appetizers: function()
	{
		//return Foods.find({$and : [{Activate: "Y"}, {Category: "Appetizer"}]},{sort: { WebId: 1 } });
		//return Menu.find({Category: "Appetizer"});
		return Menu.find({$and : [{Category: "Appetizer"}, {Name : {"$exists" : true, "$ne" : ""}}]});
				//return Foods.find({Category: "Appetizer"}, {Name : {"$exists" : true, "$ne" : ""}});

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


