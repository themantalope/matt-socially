/**
 * Created by antalek on 7/12/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './forceDirectedGraph.html';
import uiRouter from 'angular-ui-router';
import {name as MultiGraph} from "../../../models/components/multiGraph/multiGraph"
import {name as MultiGraphJSONLoader} from "../../../models/components/multiGraphJSONLoader/multiGraphJSONLoader"


class ForceDirectedGraph{
    constructor($reactive, $scope){
        "ngInject";

        $reactive(this).attach($scope);
        this.jsonFile = "";

    }

    jsonFileChanged(newFile){
        if (newFile) {
            this.jsonFile = newFile;
            this.graphLoader = MultiGraphJSONLoader(this.jsonFile);
            this.multiGraph = this.graphLoader.getMultiGraph();
            this.nodeList = this.multiGraph.getNodes();
            this.matrixIndex = 0;
            this.linkList = this.multiGraph.getLinkListForMatrix(this.matrixIndex);
        }
    }


}


const name = "forceDirectedGraph";

//create a module
export default angular.module(name, [
    angularMeteor
]).directive(name, function () {
    return {
        restrict: "ACEM",
        template: template,
        controller: ForceDirectedGraph,
        controllerAs: name,
        scope: {
            jsonFile: "@"
        },
        bindToController: true
    }
});