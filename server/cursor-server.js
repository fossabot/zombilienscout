Meteor.onConnection(function(connection) {
    Cursors.insert({
        _id: connection.id,
        x: 0,
        y: 0
    });
    connection.onClose(function() {
        Cursors.remove(connection.id);
    });
});