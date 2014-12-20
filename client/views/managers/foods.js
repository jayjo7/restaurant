Template.foodList.helpers({

	foods: function()
	{
		return Foods.find({},{sort: { webid: 1 } });
	}
});



Template.foodList.events({
	'click .addcart': function (evt, tmpl) 
	{
		console.log("tmpl" + tmpl);
		var qty = tmpl.find('.prodqty').value;
		var product = this._id;
		var sessid = Meteor.default_connection._lastSessionId;
		console.log("qty = " + qty );
		console.log("product = " + product );
		console.log("sessid = " + sessid );
		Meteor.call('addToCart', qty, product, sessid);
	}
});