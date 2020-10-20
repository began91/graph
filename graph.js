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

export const bfsGraph = (adjacencyList, startNode = 1) => {
    const canvas = createCanvas('bfs-canvas','graph',200,200); 

    const ctx = canvas.getContext('2d');
    const r = 20;

    //appends the canvas as a child to the desired element and animates the search
    const appendToElement = (domParent) => {
        domParent.appendChild(canvas);
        animateBFS();
    }

    const setStartNode = (node) => {
        startNode = node;
    }

    //draw queue
    let delay = 0;
    const queue = fn => {
        setTimeout(fn,delay);
        delay += 500;
    }

    const animateBFS = () => {
        const visited = new Set();
        const searchList = [];
        searchList.push(startNode);

        while (searchList.length > 0) {
            const currentNode = searchList.shift();
            visited.add(currentNode);
            queue(drawNode(currentNode, adjacencyList, r, ctx));
            for (let neighbor of adjacencyList.get(currentNode).neighbors) {
                queue(connectNodes(currentNode, neighbor, adjacencyList, r, ctx));
                if (!visited.has(neighbor)) {
                    searchList.push(neighbor);
                    // visited.add(neighbor);
                }
            }
            if (searchList.length === 0) {
                for (let nodeName of adjacencyList.keys()) {
                    if(!visited.has(nodeName)) {
                        searchList.push(nodeName);
                        // visited.add(nodeName);
                    }
                }
            }

            //     for (let nodeName of adjacencyList.keys()) {
            //         if (!visited.has(nodeName)) {
            //             // searchList.push(nodeName);
            //             console.log(`Node ${nodeName} is disconnected`);
            //         }
            //     }
            // }
        }
    }

    return {appendToElement, setStartNode};
}

export const dfsGraph = (adjacencyList, startNode = 1) => {
    const canvas = createCanvas('dfs-canvas','graph',200,200); 

    const ctx = canvas.getContext('2d');
    const r = 20;

    //appends the canvas as a child to the desired element and animates the search
    const appendToElement = (domParent) => {
        domParent.appendChild(canvas);
        animateDFS();
    }

    const setStartNode = (node) => {
        startNode = node;
    }

    //draw queue
    let delay = 0;
    const queue = fn => {
        setTimeout(fn,delay);
        delay += 500;
    }

    const animateDFS = () => {
        const visited = new Set();
        const search = nodeName => {
            const node = adjacencyList.get(nodeName);

            queue(drawNode(nodeName, adjacencyList, r, ctx));
            visited.add(nodeName);
            for (let neighbor of node.neighbors) {
                queue(connectNodes(nodeName, neighbor, adjacencyList, r, ctx));
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

    return {appendToElement, setStartNode};
}