const adjacencyList = new Map();

let totalNodes = 8;
let density = 1.5;//average number of connections each node should have

adjacencyList.newEntry = function(name, neighbors) {
    this.set(name, {neighbors: new Set(neighbors)});
}

adjacencyList.setLocation = function(nodeName, location) {
    const neighbors = this.get(nodeName).neighbors;
    this.set(nodeName, {neighbors, location})
}

adjacencyList.assignLocations = function() {
    const size = this.size;
    const delta = Math.PI * 2 / size;
    let theta = delta / 2;
    const r = Math.SQRT2 / 4;
    for (let nodeName of this.keys()) {
        //assume placing on unit square.
        const x = 0.5 - r * Math.cos(theta);
        const y = 0.5 - r * Math.sin(theta);
        adjacencyList.setLocation(nodeName, [x,y]);
        theta += delta;
    }
}

adjacencyList.newRandom = function() {
    adjacencyList.clear();
    for(let i = 1; i <=totalNodes; i++ ) {
        let neighbors = [];
        for (let j = 1; j<=totalNodes; j++) {
            if (Math.random() < density/totalNodes && j!==i) {
                neighbors.push(j);
            }
        }
        this.newEntry(i, neighbors);
    }
    console.log(...adjacencyList);
    console.log({totalNodes, density});
    adjacencyList.assignLocations();
}

adjacencyList.setParams = function(numNodes, nodeDensity) {
    totalNodes = numNodes;
    density = nodeDensity;
    this.newRandom();
}

// adjacencyList.newEntry(1, [2,6]);
// adjacencyList.newEntry(2, [3]);
// adjacencyList.newEntry(3, [1,6]);
// adjacencyList.newEntry(4, [5]);
// adjacencyList.newEntry(5, [6,3,4]);
// adjacencyList.newEntry(6, [5]);

adjacencyList.setDunwody = function() {
    adjacencyList.clear();
    adjacencyList.newEntry('Abby', ['Sara','Jude']);
    adjacencyList.newEntry('Sara', ['Jude','Phil Ehr']);
    adjacencyList.newEntry('Jude', ['B']);
    adjacencyList.newEntry('Phil Ehr', ['Jude']);
    adjacencyList.newEntry('B', ['Abby']);
    adjacencyList.assignLocations();
}

adjacencyList.newRandom();

export default adjacencyList;