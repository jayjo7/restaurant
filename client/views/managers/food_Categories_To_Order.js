Template.foodCategoriesToOrder.helpers({

	foodCategories: function()
	{
		return FoodCategories.find({activate: "Y"});
	}
});


