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
    },

    thankyou:function(name)
    {
      if(name)
      {
        return name +', Thank you!';
      }
      else
      {
        return 'Thank you!';
      }
    },

    ordereditems:function(UniqueId)
    {
      console.log("UniqueId = " + UniqueId);
      return OrderedItems.find({UniqueId:UniqueId});
    }

});