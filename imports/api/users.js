/**
 * Created by antalek on 7/11/16.
 */
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('users', function() {
        return Meteor.users.find({}, {
            fields: {
                emails: 1,
                profile: 1
            }
        });
    });
}