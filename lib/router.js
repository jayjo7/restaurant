Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function(){ return  Meteor.subscribe('foods'); 
 }
	
	});
	
Router.route('/', {name: 'foodsList'});

	
	
	


