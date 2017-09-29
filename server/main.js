import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

// req = request, res = response, next = reference to the next middleware we want to run
function onRoute(req, res, next) {
  // Take the token out of the url and try to find a
  // matching link in the Links collection
  const link = Links.findOne({ token: req.params.token });

  // If we find a link object, redirect the user to the long URL
  if(link){

    // no need to add a meteor method since this is already on the server
    Links.update(link, { $inc: { clicks: 1 }});

    // 307 = redirect code response
    res.writeHead(307, { 'Location': link.url });
    res.end(); // send response back to user
  }

  // If we don't find a link object, send user to normal react app
  else {
    // pass request to next middleware, will eventually lead to the react app
    next();
  }
}

//  '/:token' will look for one '/' and any single string of characters, no other '/'
const middleware = ConnectRoute(function(router) {
  //router.get('/:token', (req) => console.log(req));
  router.get('/:token', onRoute);
});

// .use adds middleware e.g. ( req => console.log(req) )
WebApp.connectHandlers.use(middleware); //req => console.log(req));
