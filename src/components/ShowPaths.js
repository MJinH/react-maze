import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faPerson,faFlag } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import { generateShortestPath } from '../algorithms/shortestPath';
import {dfs} from "../algorithms/dfs"
import {bfs} from "../algorithms/bfs"

export default function ShowPaths({setIndex,index}) {
    const {gridData} = useSelector((state) => state.maze)
    const [grid,setGrid] = useState([])
    const [clicked,setClicked] = useState(false)
    let i = 0

    useEffect(() => {
        setGrid(JSON.parse(JSON.stringify(gridData.grid)))
    },[gridData,index])


    const handleClick = () => {
      setIndex(0)
    }

    const handleButtonClicked = () => {
        console.log(index,clicked)
        if(index === 3) {
            let START_INDEX = 0
            let FINISH_INDEX = grid.length - 1
            generateShortestPath(grid,grid[START_INDEX][START_INDEX],grid[FINISH_INDEX][FINISH_INDEX])
            setClicked(!clicked)
        } else if(index === 4) {
            bfs(grid)
            setClicked(!clicked)
        } else if(index === 5) {
            dfs(grid)
            setClicked(!clicked)
        }
    }
    
  return (
    <>
        <div className="icon-wrapper" onClick={() => handleClick()}><FontAwesomeIcon icon={faXmark} className="xmark-icon"/></div>
        <div className="grid-container">
            <div className="grid-wrapper">
                <div className="grid-left">
                    {clicked ? grid.map((row,rowIndex) => {
                        i += 0.15
                        return (
                            <div className="grid">
                                {row.map((node,nodeIndex) => {
                                    if(rowIndex === 0 && nodeIndex === 0) {
                                        return(
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}>
                                                <FontAwesomeIcon icon={faPerson} className="xperson-icon"/>
                                            </div>
                                        )
                                    } else if(rowIndex === gridData.grid.length -1 && nodeIndex === gridData.grid.length -1 ){
                                        return(
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}>
                                                <FontAwesomeIcon icon={faFlag} className="xFlag-icon"/>
                                            </div>
                                        )
                                    }
                                    else if(grid[rowIndex][nodeIndex].shortestPath || grid[rowIndex][nodeIndex].bfsPath || grid[rowIndex][nodeIndex].dfsPath) {
                                        return (
                                            <div id="node" className="node">
                                                <div className="node-shortest" style={{animation: `shortest-animation ${nodeIndex === 0 && rowIndex === 0 ? 0 : i}s linear`}}></div>
                                            </div>
                                        )
                                    }  else if(node.isWall) {
                                        return (
                                            <div id="node" className="node node-wall" style={{animation: "node-animation 1s linear"}}></div>
                                        )
                                    }      
                                    else {
                                        return (
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}></div>
                                        )
                                    }
                                    
                                })}
                            </div>
                        )
                    }) :grid.map((row,rowIndex) => {
                        return (
                            <div className="grid">
                                {row.map((node,nodeIndex) => {
                                    if(rowIndex === 0 && nodeIndex === 0) {
                                        return(
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}>
                                                <FontAwesomeIcon icon={faPerson} className="xperson-icon"/>
                                            </div>
                                        )
                                    } else if(rowIndex === gridData.grid.length -1 && nodeIndex === gridData.grid.length -1 ){
                                        return(
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}>
                                                <FontAwesomeIcon icon={faFlag} className="xFlag-icon"/>
                                            </div>
                                        )
                                    }
                                    else if(node.isWall) {
                                        return (
                                            <div id="node" className={`node node-wall`} style={{animation: "node-animation 1s linear"}}></div>
                                        )
                                    } else { 
                                        return (
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}></div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="grid-right">
                    <button className="set-button" onClick={handleButtonClicked}>Show Path</button>
                </div>
            </div>
        </div>
    </>
  )
}
