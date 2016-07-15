/**
 * This class loads and parses JSON files for multilayer network. The JSON files should be of form:
 * {nodes:[list of nodes], networks:[list of adjacency matricies]}
 * At a minimum, each node data packet must contain an "index" variable, which is an integer that describes the row/col
 * location associated with that node in the adjacency matricies. An example of a node data packet would look like this:
 * {"index":1, "label":"some label", "interesting dictionary":{}}. For the networks variable, each network should be an
 * array of arrays, with 1 and 0 representing a link and the absence of a link between the ith and jth nodes, respectiv-
 * ely (recalling that the ith node would have its "index" value equal to i, as would be the case for the jth node).
 * This object will then return a MultiGraph object, which will have the features available to slice and dice the
 * networks as desired!
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {MultiGraph} from "../multiGraph/multiGraph";
// import d3 from "d3";

let _multiGraph = new WeakMap();

class MultiGraphJSONLoader{

    /*
    * This class loads and creates a MultiGraph object to use after parsing a JSON file.
    * @param {furl} - the URL of the json file with the network data
    * */
    
    constructor(furl){
        console.log("I'm about to start load json");
        this.dataLoaded = false;
        this._loadJSON(furl);
    }

    _loadJSON(fname){
        var nodes, matricies;
//        console.log(d3);
//        console.log("fname: ", fname);
        // console.log("JSON.parse", JSON.parse(fname));

        d3.json(fname, function(json) {
//            console.log("I'm in the d3.json function.");
//            console.log("json: ", json);
            if (!("nodes" in json)) {
                throw "JSON file must have a 'nodes' list!"
            } else {
                nodes = json.nodes;
            }

            if (!("matricies" in json)){
                throw "JSON file must have a 'matricies' list!"
            } else {
                matricies = json.matricies;
            }
//            console.log("made it down here! almost done.");
//            console.log("nodes: ", nodes);
//            console.log("matricies: ", matricies);
//            console.log("now I'm about to return from the callback.");
            var mg = new MultiGraph(nodes, matricies);
            _multiGraph.set(this, mg);
            this.dataLoaded = true;

            console.log("json file loaded");

//            console.log("this.getMultiGraph(): ", _multiGraph.get(this));
//            console.log("multigraph nodes: ", _multiGraph.get(this).getNodes());
//            console.log("graph 0: ", _multiGraph.get(this).getGraphForMatrix(0));
//            console.log("graph 0 link list: ", _multiGraph.get(this).getGraphForMatrix(0).getLinks());
            // return {"nodes":nodes, "matricies":matricies};
        });




    }

    getMultiGraph(){
        return _multiGraph.get(this);
    }


}

export {MultiGraphJSONLoader}
