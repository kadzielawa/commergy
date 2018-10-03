/**
 * Created by kuba on 21.08.17.
 */

/**
 *
 * @type {{initialize, changeHtml}}
 */
var Dashboard = (function() {
    var that = this;
    var container_name = '.activities-container ul';
    var comm_uid = 'xx';
    /**
     *
     * @param comm_uid
     */
    var init = function(comm_uid) {
        console.log('uid');
        console.log(comm_uid);

        that.comm_uid = comm_uid;
        var socket = io('//vps495535.ovh.net:3000',{ query: "comm_uid=" +comm_uid });

        socket.once('connect', function(){});
        socket.on('socketToMe', function(data){
            that.parsePassedData(data);

        });
        socket.on('disconnect', function(){
            console.log('DISCONNECTED')
        });
    };

        this.parsePassedData = function(data) {
            console.log(data);
        //obiekt typu:
            // element: 'string',
            // text: 'string',
            // app_id: 'string',
            // event_name 'string'
            var event_item = '<li>';
            event_item += 'CLICKED ELEMENT: ' + data.element + '<br/>';
            event_item += 'CUSTOM TEXT: ' +  data.text + '<br/>';
            event_item += 'CATEGORY: ' + data.category + '<br/>';
            event_item += 'PRICE: ' + data.price + '<br/>';
            event_item += 'EVENT NAME: ' + data.event_name + '<br/>' ;
            event_item += '</li>';
             $(container_name).append(event_item).hide().fadeIn('slow');

            setTimeout(function() {
                var el = $(container_name).children().first();
                el.fadeOut('slow',function(){
                    $(this).remove();
                });
            }, 4000);

            console.log(event_item);

    };

    return {
            initialize: init,
        changeHtml: function() {
            console.log('xxx');
        }
    };

})();