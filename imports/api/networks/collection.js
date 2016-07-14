/**
 * Created by antalek on 7/14/16.
 */
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Networks = new Mongo.Collection("networks");

Networks.allow({
    insert: function() {return true},
    remove: function() {return true},
    update: function() {return true}
});

