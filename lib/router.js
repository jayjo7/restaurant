Router.configure({
	layoutTemplate: 'layout',
	  yieldTemplates:{
    'cart':{to:'cart'},
    'foodsToOrder':{to:'foodsToOrder'}
  },

	loadingTemplate: 'loading',
	waitOn: function(){ 
		        Meteor.subscribe('cartItems',Meteor.default_connection._lastSessionId);
		        Meteor.subscribe('orders');
		return  Meteor.subscribe('menu'); 
 }
	
	});
	
Router.route('/', {name: 'foodsList'});
Router.route('/orderFood', 
				{layoutTemplate: 'layoutOrder',
				name: 'orderFood'});
Router.route('/orderConfirmation/:UniqueId', 
				{layoutTemplate:'layoutOrderCOnfirmation',
					name: 'orderConfirmation',
				 data: function(){ return {UniqueId: this.params.UniqueId}

				}});


Router.route('/order/:name', 
				{ data : function(){
					console.log("selectedCategory =" + this.params.name);
					if (this.params.name)
						Session.set('selectedCategory', this.params.name);
					else	
						Session.set('selectedCategory', 'All');
				},
					layoutTemplate: 'layoutOrder',
				name: 'order'});

	
	
	


