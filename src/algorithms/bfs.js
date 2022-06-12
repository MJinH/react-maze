


export function bfs(grid) {
    const que = []
    que.push([0,0])
    while(que.length > 0) {
        const node = que.shift()
        const newCell = [[0,1],[1,0],[-1,0],[0,-1]]
        for(const cell of newCell) {
            const newRow = node[0] + cell[0]
            const newCol = node[1] + cell[1]
            if(newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid.length || grid[newRow][newCol].bfsPath || grid[newRow][newCol].isWall){
                continue
            }
            if(newRow === grid.length - 1 && newCol === grid.length - 1) {
                grid[newRow][newCol].bfsPath = true 
                return
            }
            grid[newRow][newCol].bfsPath = true
            que.push([newRow,newCol]) 
        }
    }
}