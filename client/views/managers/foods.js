Template.foodList.helpers({

	foods: function()
	{
		return Menu.find({},{sort: { WebId: 1 } });
	},

	foodId:function(obj)
	{
		//console.log("obj = " + obj);
		return obj.valueOf();
	},

	isAvailable:function(Availability)
	{
		//console.log("Availability = " + Availability);
		if('SoldOut' === Availability)
			return false;
		else
			return true;
	}


});



Template.foodList.events({
	'click .addcart': function (evt, tmpl) 
	{
		console.log("tmpl" + tmpl);
		console.log("this._id " + this._id);
		var qty = tmpl.find('.prodqty_'+ this._id).value;
		var product = this._id;
		var sessid = Meteor.default_connection._lastSessionId;
		console.log("qty = " + qty );
		console.log("product = " + product );
		console.log("sessid = " + sessid );
		Meteor.call('addToCart', qty, product, sessid);
	}
});