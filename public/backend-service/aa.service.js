/**
 * Created by xuanyuli on 6/24/17.
 */
module.exports = function(){
    require('./admin.service.server');
    require('./item.service.server');
    require('./order.service.server');
    require('./user.service.server');
    require('./paypal.service.server');
}();
