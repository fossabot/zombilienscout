Template.body.events({
    'mousemove': function(event) {
        if (Meteor.status().connected) {
            Cursors.update(Meteor.connection._lastSessionId, {
                $set: {
                    x: event.pageX,
                    y: event.pageY
                }
            });
        }
    }
});