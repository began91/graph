const createCanvas = (id, className, height = 150, width = 300) => {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.className = className;
    canvas.height = height;
    canvas.width = width;
    return canvas;
}

const drawNode = (nodeName, adjacencyList, r, ctx) => () => {
    // console.log({currentNode, adjacencyList, r, ctx});
    const node = adjacencyList.get(nodeName);
    // console.log(node);
    const [x,y] = node.location;
    ctx.beginPath();
    ctx.arc(x*200,y*200,r,0,2*Math.PI);
    ctx.stroke();
    ctx.fillText(nodeName,x*200-3,y*200+3);
}

const connectNodes = (start, end, adjacencyList, r, ctx) => () => {
    const [x1,y1] = adjacencyList.get(start).location;
    const [x2,y2] = adjacencyList.get(end).location;
    const slope = (y2-y1)/(x2-x1);
    let theta = Math.atan(slope);
    // console.log({x1,y1,x2,y2,slope,theta,r});
    let X1,X2,Y1,Y2;//coords to be drawn
    if (x1 < x2) {
        X1 = x1*200 + r * Math.cos(theta);
        theta += Math.PI;
        X2 = x2*200 + r * Math.cos(theta);
    } else {
        X1 = x1*200 - r * Math.cos(theta);
        theta += Math.PI;
        X2 = x2*200 - r * Math.cos(theta);
    }
    theta -= Math.PI;
    if (slope ===Infinity || (slope > 0 && y1 < y2) || (slope < 0 && y1>y2)) {
        Y1 = y1*200 + r * Math.sin(theta)
        theta += Math.PI;
        Y2 = y2*200 + r * Math.sin(theta)
    } else {
        Y1 = y1*200 - r * Math.sin(theta)
        theta += Math.PI;
        Y2 = y2*200 - r * Math.sin(theta)
    }
    // console.log({X1, Y1, X2, Y2});
    ctx.moveTo(X1, Y1);
    ctx.lineTo(X2, Y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(X2,Y2,4,0,2*Math.PI);
    ctx.stroke();
    
    //y/x = opp/adj = tan(-)
    //(-) = tan-1(slope);
    //x = x1 + r*cos(-)
    //y = y1 + r*sin(-)
}

const newGraph = (type,adjacencyList,startNode) => {
    if (!startNode) {
        startNode = adjacencyList.keys().next().value;
    }
    
    const canvas = createCanvas(`${type}-canvas`,'graph',200,200); 
    
    const ctx = canvas.getContext('2d');
    const r = 20;
    
    //appends the canvas as a child to the desired element and animates the search
    const appendToElement = (domParent) => {
        domParent.appendChild(canvas);
        animateGraph();
    }
    
    const setStartNode = (node) => {
        startNode = node;
    }

    let queue = [];
    let interval;
    const animateGraph = () => {
        interval = setInterval(()=> {
            let fn = queue.shift();
            fn();
            if (queue.length === 0) {
                clearInterval(interval);
            }
        },500);
    }
    
    const deleteGraph = () => {
        clearInterval(interval);
        canvas.remove();
    }
    
    const visited = new Set();
    
    if (type==='bfs') {
        ctx.fillText('Breadth First Search',10,10);
        
        const searchList = new Set();
        searchList.add(startNode);
        
        while (searchList.size > 0) {
            // console.log(...searchList);
            const currentNode = searchList.keys().next().value;
            searchList.delete(currentNode);
            visited.add(currentNode);
            queue.push(drawNode(currentNode, adjacencyList, r, ctx));
            for (let neighbor of adjacencyList.get(currentNode).neighbors) {
                queue.push(connectNodes(currentNode, neighbor, adjacencyList, r, ctx));
                if (!visited.has(neighbor)) {
                    searchList.add(neighbor);
                    // visited.add(neighbor);
                }
            }
            if (searchList.size === 0) {
                for (let nodeName of adjacencyList.keys()) {
                    if(!visited.has(nodeName)) {
                        searchList.add(nodeName);
                        // visited.add(nodeName);
                    }
                }
            }
        }
    } else if (type==='dfs') {
        ctx.fillText('Depth First Search',10,10);
        const search = nodeName => {
            const node = adjacencyList.get(nodeName);
            
            queue.push(drawNode(nodeName, adjacencyList, r, ctx));
            visited.add(nodeName);
            for (let neighbor of node.neighbors) {
                queue.push(connectNodes(nodeName, neighbor, adjacencyList, r, ctx));
                if (!visited.has(neighbor)) {
                    search(neighbor);
                }
            }
        }
        search(startNode);
        for (let nodeName of adjacencyList.keys()) {
            if (!visited.has(nodeName)) {
                search(nodeName);
            }
        }
    }    
    return {appendToElement, setStartNode, deleteGraph};
}

export const bfsGraph = (adjacencyList, startNode) => {
    return newGraph('bfs',adjacencyList,startNode);
}

export const dfsGraph = (adjacencyList, startNode) => {
    return newGraph('dfs',adjacencyList,startNode);
}