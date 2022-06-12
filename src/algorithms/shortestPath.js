
export function generateShortestPath(shortestPath,start,finish) {
    const visitedNodes = []
    start.distance = 0
    const unvisitedNodes = getNodes(shortestPath)
    while(unvisitedNodes.length > 0) {
        getShortestDistance(unvisitedNodes)
        const neighbor = unvisitedNodes.shift()
        if(neighbor.isWall) continue
        if(neighbor.distance === Infinity) return visitedNodes;
        neighbor.visited = true
        visitedNodes.push(neighbor)
        if(neighbor === finish) break
        getUnvisitedNodes(neighbor,shortestPath)
    }

    let currentNode = finish
    console.log(currentNode)
    while (currentNode !== null) {
        currentNode.shortestPath = true
        currentNode = currentNode.previousNode
    }
}

function getUnvisitedNodes(neighbor,shortestPath) {
    // console.log(neighbor)
    const newNeighbors = []
    const {row,col} = neighbor
    // console.log(row,col)
    // console.log(row,col)
    const newCells = [[0,1],[1,0],[-1,0],[0,-1]]
    for(const cell of newCells) {
        const newRow = row + cell[0]
        const newCol = col + cell[1]
        // console.log(newRow,newCol)
        if(newRow < 0 || newRow >= shortestPath.length || newCol < 0 || newCol >= shortestPath.length || shortestPath[newRow][newCol].visited || shortestPath[newRow][newCol].isWall){
            continue
        }
        newNeighbors.push(shortestPath[newRow][newCol])
    }
    // console.log(newNeighbors)
    for(const neighbors of newNeighbors) {
        neighbors.distance = neighbor.distance + 1
        neighbors.previousNode = neighbor
    }
}



function getShortestDistance(unvisitedNodes) {
    unvisitedNodes.sort((a,b) => a.distance - b.distance)
}



function getNodes(shortestPath) {
    const nodes = []
    for(const row of shortestPath) {
        for(const col of row) {
            nodes.push(col)
        }
    }
    return nodes
}


