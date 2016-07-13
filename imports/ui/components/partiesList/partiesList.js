import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './partiesList.html';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { Parties } from '../../../api/parties';
import { name as PartyRemove } from '../partyRemove/partyRemove';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { name as PartiesSort } from '../partiesSort/partiesSort';
import {name as ForceDirectedGraph} from "../forceDirectedGraph/forceDirectedGraph"

class PartiesList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name:1
        };
        this.searchText = '';

        this.subscribe('parties', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')
        ]);

        this.helpers({
            parties() {
                return Parties.find({}, {
                    sort: this.getReactively('sort')
                });
            }
        });
    }

    partiesCount() {
        return Counts.get('numberOfParties');
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }

}

const name = 'partiesList';

// create a module
export default angular.module(name, [
    angularMeteor,
    PartyAdd,
    PartyRemove,
    uiRouter,
    utilsPagination,
    PartiesSort,
    ForceDirectedGraph
]).component(name, {
    template,
    controllerAs: name,
    controller: PartiesList
}).config(config);


function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('parties', {
            url: '/parties',
            template: '<parties-list></parties-list>'
        });
}