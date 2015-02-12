Template.orderConfirmation.helpers({

    order: function(uniqueId)
    {
        console.log('uniqueId = ' + uniqueId);

        return Orders.find({UniqueId:uniqueId});

            
               // for(var key in order)
               // {
               //     console.log(key + ' = ' + order[key]);
               // }
               // return order;
            

    
    }
        ,

    currency: function(num)
    {
        console.log('num = ' + num);
        return '$' + Number(num).toFixed(2);
    }

});