/**
 * Created by xuanyuli on 6/23/17.
 */

module.exports = function(){
    require('./admin.model.server');
    require('./admin.schema.server');
    require('./item.model.server');
    require('./item.schema.server');
    require('./order.model.server');
    require('./order.schema.server');
    require('./user.model.server');
    require('./user.schema.server');
}();

