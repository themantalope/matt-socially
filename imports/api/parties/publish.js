/**
 * Created by antalek on 7/1/16.
 */
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Parties } from './collection';

if (Meteor.isServer) {
    Meteor.publish('parties', function(options) {
        const selector = {
            $or: [{
                // the public parties
                $and: [{
                    public: true
                }, {
                    public: {
                        $exists: true
                    }
                }]
            }, {
                // when logged in user is the owner
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }]
        };

        if (typeof searchString === 'string' && searchString.length) {
            selector.name = {
                $regex: `.*${searchString}.*`,
                $options : 'i'
            };
        }

        Counts.publish(this, 'numberOfParties', Parties.find(selector), {
            noReady: true
        });
        return Parties.find(selector, options);
    });
}