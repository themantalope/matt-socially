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
        $scope.testval = 42;
        $scope.jsonFile = this.jsonFile;
        this.myscoper = $scope;

    }

    jsonFileChanged(){
        if (this.jsonFile) {
            console.log(this.jsonFile);
            this.myscoper.jsonFile = this.jsonFile;
            this.graphLoader = new MultiGraphJSONLoader();
            console.log(this.graphLoader);
            this.multiGraph = this.graphLoader.getMultiGraph();
            this.nodeList = this.multiGraph.getNodes();
            this.matrixIndex = 0;
            this.linkList = this.multiGraph.getLinkListForMatrix(this.matrixIndex);
        }
    }

    checkThing(){
        console.log(this.jsonFile);
        this.jsonFileChanged(this.jsonFile)
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
        bindToController: true
    }
});