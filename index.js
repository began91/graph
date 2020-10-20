import adjacencyList from './adjacencyList.js'; 
import {bfsGraph, dfsGraph} from './graph.js';

let grapharea = document.getElementById('grapharea');
// grapharea.innerHTML = 'This is the graph';
let dfs, bfs;

const generateGraphs = () => {   
    dfs = dfsGraph(adjacencyList);
    dfs.appendToElement(grapharea);
    
    bfs = bfsGraph(adjacencyList);
    bfs.appendToElement(grapharea);
}

const deleteGraphs = () => {
    dfs.deleteGraph();
    bfs.deleteGraph();
}

generateGraphs()

const dunButt = document.getElementById('dunwody');
const genButt = document.getElementById('generate-nodes');

dunButt.addEventListener('click',()=>{
    deleteGraphs()
    adjacencyList.setDunwody();
    generateGraphs();
})

genButt.addEventListener('click',()=>{
    const numNodes = document.getElementById('number-nodes').value;
    const nodeDensity = document.getElementById('node-density').value;
    deleteGraphs();
    adjacencyList.setParams(Math.floor(numNodes), nodeDensity);
    // console.log(...adjacencyList);
    generateGraphs();
})