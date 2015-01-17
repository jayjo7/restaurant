Template.collectContactInfo.events({

    'submit form': function(event){
        event.preventDefault();
        console.log("collectContactInfo form submitted");
        console.log(event.type);
        var contactInfo = {};

        contactInfo.phoneNumber = event.target.intputPhoneNumber.value;
        contactInfo.email=event.target.inputEmail.value;
        contactInfo.messageToKitchen = event.target.messageToKitchen.value;
        contactInfo.contactName = event.target.contactName.value;
        console.log(contactInfo.phoneNumber);
        console.log(contactInfo.email);
        console.log(contactInfo.messageToKitchen);
        console.log(contactInfo.contactName);
            var sessid = Meteor.default_connection._lastSessionId;
            console.log("Confirming orders... " + sessid);

         var contact

        console.log("contact = " + contactInfo);

            Meteor.call('orderItems',sessid, contactInfo, function(error, result){

                if(error)
                {
                    if(result)
                    {
                        console.log("Could not insert the order for the session  = " + sessid + "Order = " + JSON.stringify(result, null, 4));
                    }
                    else
                    {
                        console.log("Could not insert the order for the session  = " + sessid );
                    }

                }
                else
                {
                    console.log("sessid = " + sessid);

                    Router.go('orderConfirmation',  {UniqueId: sessid});

                }

            });


    }

});

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
        var product = Menu.findOne({_id:cartitem.product});
        var charge = product.Charge;

        cartitem.productname = product.Name;
        cartitem.price = (Number(charge) * cartitem.qty);
        total += cartitem.price;
        shopCart.push(cartitem);
    });
    shopCart.subtotal = total;
    shopCart.tax = shopCart.subtotal * .092;

    shopCart.total = shopCart.subtotal + shopCart.tax;


    return shopCart;

       


    },

    currency: function(num)
    {
        return '$' + Number(num).toFixed(2);
    }


});



Template.cart.events({
    'click .removeci':function(evt,tmpl){
       // console.log("aaaa");
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

        if(Meteor.user())
        {
            //TODO: Verify/Validate login and have enough contact info
        }
        else
        {
            alert("Please sign in.")
        }



        }

});