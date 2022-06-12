import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { updateMaze } from '../redux/apiCalls';

export default function BFS({setIndex}) {


  const {gridData} = useSelector((state) => state.maze)
  const [walls,setWalls] = useState([])
  const [clicked,setClicekd] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    const grid = {
        grid: gridData.grid,
        shortestPath: gridData.shortestPath,
        walls: walls
    }
    updateMaze(grid,dispatch)
    setIndex(0)
  }


  const handleNodeClicked = (row,col) => {
    setWalls((prev) => [...prev,[row,col]])
  }

  const handleButtonClicked = () => {
    
    setClicekd(true)
  }

  return (
    <>
        <div className="icon-wrapper" onClick={() => handleClick()}><FontAwesomeIcon icon={faXmark} className="xmark-icon"/></div>
        <div className="grid-container">
            <div className="grid-wrapper">
                <div className="grid-left">
                {gridData.grid.map((row,rowIndex) => {
                        return (
                            <div className="grid">
                                {row.map((node,nodeIndex) => {
                                    return (
                                        <div id="node" className="node" onClick={() => handleNodeClicked(rowIndex,nodeIndex)}></div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="grid-right">
                    <button className="set-button" onClick={handleButtonClicked}>BFS</button>
                </div>
            </div>
        </div>
    </>
  )
}
