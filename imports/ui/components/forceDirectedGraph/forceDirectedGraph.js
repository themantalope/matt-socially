/**
 * Created by antalek on 7/12/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import template from './forceDirectedGraph.html';
import { Networks } from "../../../api/networks";
import { HTTP } from "meteor/http";
// import uiRouter from 'angular-ui-router';
import {MultiGraphJSONLoader} from "../../../models/components/multiGraphJSONLoader/multiGraphJSONLoader"
import {name as NetworkUpload } from "../networkUpload/networkUpload";


class ForceDirectedGraph{
    constructor($reactive, $scope){
        "ngInject";

        $reactive(this).attach($scope);
        this.subscribe("networks");
        this.jsonFile = "/d1_d2_networks.json";
        console.log(this.jsonFile);
        $scope.testval = 42;
        $scope.jsonFile = this.jsonFile;
        this.myscoper = $scope;
        var temp;
        try{
            HTTP.get(Meteor.absoluteUrl(this.jsonFile), function (err, result) {
                console.log(result.data);
                this.jsonData = result.data;
                console.log("this.jsonData in the http callback: ", this.jsonData);
                temp = result.data;
                return result.data;
            });
        }catch (err) {
            console.log(err);
        }

        this.helpers({
            networks(){
                return Networks.find();
            }
        });


        console.log("this.jsonData: ", this.jsonData);
        console.log("temp: ", temp);
        console.log("networks: ", this.networks);


    }

    jsonFileChanged(){
        console.log("this is the jsonData: ", this.jsonData);
        if (this.jsonData) {
            console.log(this.jsonData);
            this.myscoper.jsonFile = this.jsonFile;
            this.graphLoader = new MultiGraphJSONLoader(this.jsonData);
            console.log(this.graphLoader.getMultiGraph());
            console.log(this.graphLoader);
            this.multiGraph = this.graphLoader.getMultiGraph();
            this.nodeList = this.multiGraph.getNodes();
            this.matrixIndex = 0;
            this.linkList = this.multiGraph.getLinkListForMatrix(this.matrixIndex);
        }
    }

    checkThing(){
        // console.log("nothing here: ", !this.jsonFile);
        // console.log(this.jsonFile);
        // this.jsonFileChanged(this.jsonFile)
        console.log("networks: ", this.networks);
    }

    loadNetwork(){
        if (this.networks.length > 0){
            var theneturl = this.networks[0].url;
            console.log("the net url: ", theneturl);
            this.graphLoader = new MultiGraphJSONLoader(theneturl);
        }
        else {
            console.log("no network files were found.");
        }
    }


}


const name = "forceDirectedGraph";

//create a module
export default angular.module(name, [
    angularMeteor,
    NetworkUpload
]).directive(name, function () {
    return {
        restrict: "ACEM",
        template: template,
        controller: ForceDirectedGraph,
        controllerAs: name,
        bindToController: true
    }
});