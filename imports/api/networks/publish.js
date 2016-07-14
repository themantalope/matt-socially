/**
 * Created by antalek on 7/14/16.
 */
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Networks } from "./collection";

if (Meteor.isServer){
    Meteor.publish("networks", function(){
        return Networks.find();
    });
}