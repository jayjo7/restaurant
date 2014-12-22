Template.cart.helpers ({

    shopCart: function()
    {

    //console.log("In Cart Temlate");

    var shopCart = [];
    var sessid = Meteor.default_connection._lastSessionId;
    var cartItems = CartItems.find({session: sessid});
    shopCart.itemCount = cartItems.count();
    var total = 0;

    cartItems.forEach(function(cartitem){
        var item = _.extend(cartitem,{});
        var product = Foods.findOne({_id:cartitem.product});
        //console.log("product.charge = " + product.charge);
        var charge = product.charge;
        if(charge.substring(0,1) == "$")
        {
            charge = product.charge.substring(1);
        }
        //console.log("charge= " + charge);

        cartitem.productname = product.name;
        cartitem.price = (Number(charge) * cartitem.qty);
        total += cartitem.price;
        shopCart.push(cartitem);
    });
    shopCart.subtotal = total;
    shopCart.tax = shopCart.subtotal * .092;
    //console.log("shopCart.subtotal  = "+ shopCart.subtotal );
   // console.log("shopCart.tax = " + shopCart.tax);
    shopCart.total = shopCart.subtotal + shopCart.tax;

    //console.log("shopCart = " +shopCart);
    return shopCart;

       


    },

    currency: function(num)
    {
        return '$' + Number(num).toFixed(2);
    }


});



//Template.cart.currency = function(num){
 //   return '$' + Number(num).toFixed(2);
//};

Template.cart.events({
    'click .removeci':function(evt,tmpl){
        console.log("aaaa");
        Meteor.call('removeCartItem',this._id);
    }
});

Template.cart.events({
    'click .cancelOrder':function(evt,tmpl){
        var sessid = Meteor.default_connection._lastSessionId;
        if(confirm ("Are you sure? "))
        {
            console.log("Removing all items in the cart for session id " + sessid);
            Meteor.call('removeAllCartItem',sessid);
        }
    }});

Template.cart.events({
    'click .confirmOrder':function(evt,tmpl){
            //TODO: Verify/Validate login and have enough contact info
            var sessid = Meteor.default_connection._lastSessionId;
            console.log("Confirming orders... " + sessid);

            Meteor.call('orderItems',sessid, Meteor.user(), function(error, result){

                if(error)
                {
                    console.log("Could not insert the order for the session  = " + sessid);

                }
                else
                {
                    if (confirm("We have received the order, you will receive the notification when it is ready to pickup"))
                    {
                        Router.go("foodsList");

                    }
                    else
                    {
                        Router.go("foodsList");
                    }
                }

            });



        }

});