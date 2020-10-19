const adjacencyList = new Map();

adjacencyList.newEntry = function(name, location, neighbors) {
    this.set(name, {location, neighbors: new Set(neighbors)});
}

adjacencyList.newEntry(1, [50,50], [2]);
adjacencyList.newEntry(2, [150,50], [3,4]);
adjacencyList.newEntry(3, [50,150], [1]);
adjacencyList.newEntry(4, [150,150], [3,1]);

export default adjacencyList;