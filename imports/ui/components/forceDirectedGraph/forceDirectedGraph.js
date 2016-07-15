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
//import { d3 } from "d3";


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
        this.loadedGraphs = false;

        this.helpers({
            networks(){
                return Networks.find();
            }
        });

        console.log("about to run loadNetwork()");

        this.loadNetwork();

        console.log("call to loadNetwork() complete");

    }

    jsonFileChanged(){
        console.log("this is the jsonData: ", this.jsonData);
        if (this.jsonData && !this.graphLoader.dataLoaded ) {
            console.log(this.jsonData);
            this.myscoper.jsonFile = this.jsonFile;
            this.graphLoader = new MultiGraphJSONLoader(this.jsonData);

        } else if (this.graphLoader.dataLoaded) {
            this.multiGraph = this.graphLoader.getMultiGraph();
            this.curGraph = this.multiGraph.getGraphForMatrix(0);
            this.curLinks = this.curGraph.getLinks();
            this.curNodes = this.curGraph.getNodes();

            console.log("here are the links: ", this.curLinks);
            console.log("here are the nodes: ", this.curNodes);
        }

    }

    checkThing(){
        // console.log("nothing here: ", !this.jsonFile);
        // console.log(this.jsonFile);
        // this.jsonFileChanged(this.jsonFile)
        console.log("networks: ", this.networks);
    }

    loadNetwork(){

        console.log("in the loadNetworks function");
        console.log("this.networks: ", this.networks);

        if (this.networks.length > 0){
            var theneturl = this.networks[0].url;
            console.log("the net url: ", theneturl);
            this.graphLoader = new MultiGraphJSONLoader(theneturl);
            console.log("this.graphloader: ", this.graphLoader);
        }
        else if (this.graphLoader.dataLoaded) {
            this.multiGraph = this.graphLoader.getMultiGraph();
            this.curGraph = this.multiGraph.getGraphForMatrix(0);
            this.curLinks = this.curGraph.getLinks();
            this.curNodes = this.curGraph.getNodes();

            console.log("here are the links: ", this.curLinks);
            console.log("here are the nodes: ", this.curNodes);
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
    NetworkUpload,

]).directive(name, function () {
    //constants
    var width = 800;
    var margin = 20;
    var height = 500 - margin;

    return {
        restrict: "E",
        template: template,
        controller: ForceDirectedGraph,
        controllerAs: name,
        bindToController: true,
        scope: {
            links: "=",
            nodes: "="
        },
        link: function (scope, element, attrs) {

            scope.forceDirectedGraph.loadNetwork();

            console.log("here is element[0]: ", element[0]);
            console.log("this is d3: \n", d3);
            console.log("this is angular: ", angular);
            console.log("scope: ", scope);
            console.log("here is scope.nodes: ", scope.nodes);
            console.log("here is scope.links: ", scope.links);
            console.log("scope.forceDirectedGraph: ", scope.forceDirectedGraph);
            console.log("scope.forceDirectedGraph.links: ", scope.forceDirectedGraph.links);
            console.log("scope.forceDirectedGraph.nodes: ", scope.forceDirectedGraph.nodes);

            scope.$watch("links", function(newval, oldval){
                scope.links = newval;
            });

            scope.$watch("nodes", function (newval, oldval) {
                scope.nodes = newval;
            });

            if (scope.links && scope.nodes) {
                var vis = d3.select(element[0])
                            .append("svg")
                            .attr("width", width)
                            .attr("height", height + margin + 100);


                var force = d3.layout.force()
                              .size([width, height])
                              .nodes(scope.nodes)
                              .links(scope.links);

                force.linkDistance(width / 2.0);

                var link = vis.selectAll(".link")
                              .data(scope.links)
                              .enter()
                              .append("line")
                              .attr("class", "link");

                var node = vis.selectAll(".node")
                              .data(scope.nodes)
                              .enter()
                              .append("circle")
                              .attr("class", "node");

                force.on("end", ticked);

                force.start();

                function ticked () {
                    link.attr("x1", function (d) { return d.source.x })
                        .attr("x2", function (d) { return d.source.y })
                        .attr("x2", function (d) { return d.target.x })
                        .attr("y2", function (d) { return d.target.y });

                    node.attr("cx", function (d) { return d.x })
                        .attr("cy", function (d) { return d.y });

                }

            }


        }
    }
});