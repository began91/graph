import adjacencyList from './adjacencyList.js'; 
import {bfsGraph, dfsGraph} from './graph.js';

let grapharea = document.getElementById('grapharea');
// grapharea.innerHTML = 'This is the graph';

const dfs = dfsGraph(adjacencyList);
dfs.appendToElement(grapharea);

const bfs = bfsGraph(adjacencyList);
bfs.appendToElement(grapharea);