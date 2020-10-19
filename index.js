import adjacencyList from './adjacencyList.js';

let grapharea = document.getElementById('grapharea');
// grapharea.innerHTML = 'This is the graph';

const dfsGraph = (startNode) => {
    const canvas = document.createElement('canvas');
    canvas.id = 'dfsCanvas';
    canvas.className = 'graph';
    canvas.height = 200;
    canvas.width = 200;
    grapharea.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const r = 20;
    
    let delay = 0;
    const queue = fn => {
        setTimeout(fn, delay);
        delay += 500;
    }

    const connectNodes = (start,end) => {
        const [x1,y1] = adjacencyList.get(start).location;
        const [x2,y2] = adjacencyList.get(end).location;
        const slope = (y2-y1)/(x2-x1);
        let theta = Math.atan(slope);
        // console.log({x1,y1,x2,y2,slope,theta,r});
        let X1,X2,Y1,Y2;//coords to be drawn
        if (x1 < x2) {
            X1 = x1 + r * Math.cos(theta);
            theta += Math.PI;
            X2 = x2 + r * Math.cos(theta);
        } else {
            X1 = x1 - r * Math.cos(theta);
            theta += Math.PI;
            X2 = x2 - r * Math.cos(theta);
        }
        theta -= Math.PI;
        if (slope ===Infinity || (slope > 0 && y1 < y2) || (slope < 0 && y1>y2)) {
            Y1 = y1 + r * Math.sin(theta)
            theta += Math.PI;
            Y2 = y2 + r * Math.sin(theta)
        } else {
            Y1 = y1 - r * Math.sin(theta)
            theta += Math.PI;
            Y2 = y2 - r * Math.sin(theta)
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

    const visited = new Set();
    
    const search = nodeName => {
        
        const node = adjacencyList.get(nodeName);
        const [x,y] = node.location;
        const neighbors = node.neighbors;
        
        //draw the node
        queue(()=>{
            // console.log(`Visiting node ${nodeName}`);
            ctx.beginPath();
            ctx.arc(x,y,r,0,2*Math.PI);
            ctx.stroke();
            ctx.fillText(nodeName,x-3,y+3);
        })
        
        visited.add(nodeName);
        
        for (let neighbor of neighbors) {
            //draw line to neighbor
            queue(()=>{
                // console.log(`${nodeName}'s neighbor ${neighbor}`);
                connectNodes(nodeName,neighbor);
            })

            if (!visited.has(neighbor)) {
                // queue(()=>console.log(`Haven't visited ${neighbor}, yet`))
                search(neighbor);
            } else {
                // queue(()=>console.log(`Already visited ${neighbor}`));
            }
            // queue(()=>console.log(`Going back to ${nodeName}`));
        }
    }

    search(startNode);
}

dfsGraph(1);

const bfsGraph = (startNode) => {
    const canvas = document.createElement('canvas');
    canvas.id = 'dfsCanvas';
    canvas.className = 'graph';
    canvas.height = 200;
    canvas.width = 200;
    grapharea.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const r = 20;
    
    let delay = 0;
    const queue = fn => {
        setTimeout(fn, delay);
        delay += 500;
    }

    const connectNodes = (start,end) => {
        const [x1,y1] = adjacencyList.get(start).location;
        const [x2,y2] = adjacencyList.get(end).location;
        const slope = (y2-y1)/(x2-x1);
        let theta = Math.atan(slope);
        // console.log({x1,y1,x2,y2,slope,theta,r});
        let X1,X2,Y1,Y2;//coords to be drawn
        if (x1 < x2) {
            X1 = x1 + r * Math.cos(theta);
            theta += Math.PI;
            X2 = x2 + r * Math.cos(theta);
        } else {
            X1 = x1 - r * Math.cos(theta);
            theta += Math.PI;
            X2 = x2 - r * Math.cos(theta);
        }
        theta -= Math.PI;
        if (slope ===Infinity || (slope > 0 && y1 < y2) || (slope < 0 && y1>y2)) {
            Y1 = y1 + r * Math.sin(theta)
            theta += Math.PI;
            Y2 = y2 + r * Math.sin(theta)
        } else {
            Y1 = y1 - r * Math.sin(theta)
            theta += Math.PI;
            Y2 = y2 - r * Math.sin(theta)
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

    const drawNode = nodeName => {
        const [x,y] = adjacencyList.get(nodeName).location;
        ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.stroke();
        ctx.fillText(nodeName,x-3,y+3);
    }

    const visited = new Set();
    const searchList = [];
    searchList.push(startNode);
    visited.add(startNode);

    while(searchList.length > 0) {
        const currentNode = searchList.shift();
        queue(()=>drawNode(currentNode));
        for(let neighbor of adjacencyList.get(currentNode).neighbors) {
            queue(()=>connectNodes(currentNode,neighbor));
            if(!visited.has(neighbor)) {
                searchList.push(neighbor);
                visited.add(neighbor);
            }
        }
    }
}

bfsGraph(1);