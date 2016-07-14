import { Meteor } from 'meteor/meteor';
import { Parties } from '../imports/api/parties/index';
import { Networks } from "../imports/api/networks/index";

Meteor.startup(() => {
    if (Parties.find().count() === 0) {
        const parties = [{
            'name': 'Dubstep-Free Zone',
            'description': 'Fast just got faster with Nexus S.'
        }, {
            'name': 'All dubstep all the time',
            'description': 'Get it on!'
        }, {
            'name': 'Savage lounging',
            'description': 'Leisure suit required. And only fiercest manners.'
        }, {'name': 'Matt Party',
            'description':'A party from the coolest person ever.'}];

        parties.forEach((party) => {
            Parties.insert(party)
        });
    }
});