Stream = new Meteor.Stream('public');

if( Meteor.isClient ) {

  Cursors = new Mongo.Collection(null);

  Template.cursor.events({
    'mousemove': function(event) {

      if (Meteor.status().connected) {
        Stream.emit('p', { 
          _id: Meteor.connection._lastSessionId,
          x: event.pageX, 
          y: event.pageY 
        });
      }

    }
  });

  Stream.on('p', function(p) {

    // how can I change this? 

    if( Cursors.findOne(p._id) === undefined ) {

      Cursors.insert({
        _id: p._id,
        x: p.x,
        y: p.y
      });

    } else {

      Cursors.update(p._id, {
          $set: {
            x: p.x,
            y: p.y
          }
        }
      );
    }

  });

  function getCursors() {
    return Cursors.find();
  }
  var throttledGetCursors = _.throttle(getCursors, 50);

  Template.cursor.helpers({
    cursors: throttledGetCursors
  });
}
