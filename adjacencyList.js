const adjacencyList = new Map();

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

const totalNodes = 8;
const density = 1.5;//average number of connections each node should have
for(let i = 1; i <=totalNodes; i++ ) {
    let neighbors = [];
    for (let j = 1; j<=totalNodes; j++) {
        if (Math.random() < density/totalNodes && j!==i) {
            neighbors.push(j);
        }
    }
    adjacencyList.newEntry(i, neighbors);
}

// adjacencyList.newEntry(1, [2, 3]);
// adjacencyList.newEntry(2, [3, 4]);
// adjacencyList.newEntry(3, [6]);
// adjacencyList.newEntry(4, [3]);
// adjacencyList.newEntry(5, [1,3,4]);
// adjacencyList.newEntry(6, [5])

// adjacencyList.newEntry('Abby', ['Sara','Jude']);
// adjacencyList.newEntry('Sara', ['Jude','Phil Ehr']);
// adjacencyList.newEntry('Jude', []);
// adjacencyList.newEntry('Phil Ehr', ['Jude']);

adjacencyList.assignLocations();

export default adjacencyList;