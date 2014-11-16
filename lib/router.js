Router.configure({
	layoutTemplate: 'layout',
	  yieldTemplates:{
    'foodCategoriesToOrder':{to:'foodCategoriesToOrder'},
    'cart':{to:'cart'},
    'foodsToOrder':{to:'foodsToOrder'}
  },

	loadingTemplate: 'loading',
	waitOn: function(){ return  Meteor.subscribe('foods'); 
 }
	
	});
	
Router.route('/', {name: 'foodsList'});
Router.route('/listToOrder', 
				{layoutTemplate: 'layoutOrder',
				name: 'listToOrder'});

	
	
	


