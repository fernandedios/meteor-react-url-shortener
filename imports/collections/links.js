import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

// meteor method is a function that is used to run a chunk of code in a secure fashion
Meteor.methods({
  'links.insert': function(url) {
    //console.log('attempting to save', url);

    //validUrl.isUri(url);
    //custom validation, throws a js error when fail, automatically kicked off the function instantly
    check(url, Match.Where(url => validUrl.isUri(url)));

    // We're ready to save the url
    const token = Math.random().toString(36).slice(-5); // nifty random 5 string  generator

    //Links.insert({ url: url, token: token, clicks: 0});
    Links.insert({ url, token, clicks: 0}); // <- es6 destructured
  }
});

export const Links = new Mongo.Collection('links');
