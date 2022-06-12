

export function dfs(grid) {
    getDFS(grid,0,0)
}

function getDFS(grid,row,col) {
    grid[row][col].dfsPath = true
    if(row === grid.length -1 && col === grid.length -1) return
    const newCell = [[0,1],[1,0],[-1,0],[0,-1]]
    for(const cell of newCell) {
            const newRow = row + cell[0]
            const newCol = col + cell[1]
            if(newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid.length || grid[newRow][newCol].dfsPath || grid[newRow][newCol].isWall){
                continue
            }
            getDFS(grid,newRow,newCol)
            if(grid[grid.length -1][grid.length -1].dfsPath) return
    }
}