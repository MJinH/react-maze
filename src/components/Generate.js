import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faPerson,faFlag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from 'react-redux';
import { updateMaze } from '../redux/apiCalls';

export default function Generate({setIndex,grids,setGrids,number,setNumber,changed,setChanged}) {
      
  const [shortestPath, setShortestPath] = useState()
  const [text,setText] = useState(null)
  const dispatch = useDispatch()



  const handleClick = () => {
      const gridData = {
          grid: grids,
          shortestPath: shortestPath
      }
      updateMaze(gridData,dispatch)
      setIndex(0)
  }

  const handleChange = (e) => {
      setText(e.target.value)
  }

  const handleButtonClicked = (text) => {
    if(Number(text) === 0 || Number(text) > 15) {
        document.getElementById("set-warning").style.visibility = "visible"
        document.getElementById("set-warning").style.animation = "warning-animation 1s linear"
        setTimeout(() => {
            document.getElementById("set-warning").style.animation = "warning-reverse-animation 1s linear"
        },2000)
        setTimeout(() => {
            document.getElementById("set-warning").style.visibility = "hidden"
        },3000)

    } else {
        setNumber(Number(text))
    }
  }

  const handleNodeClicked = (row,col) => {
    setChanged(!changed)
    grids[row][col].isWall = !grids[row][col].isWall
  }



  return (
      <>
        <div className="icon-wrapper" onClick={() => handleClick()}><FontAwesomeIcon icon={faXmark} className="xmark-icon"/></div>
        <div className="grid-container">
            <div className="grid-wrapper">
                <div id="grid-left" className="grid-left">
                    {
                    grids.map((row,rowIndex) => {
                        return (
                            <div className="grid">
                                {row.map((node,nodeIndex) => {
                                    if(rowIndex === 0 && nodeIndex === 0) {
                                        return(
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}>
                                                <FontAwesomeIcon icon={faPerson} className="xperson-icon"/>
                                            </div>
                                        )
                                    } else if(rowIndex === grids.length -1 && nodeIndex === grids.length -1 ){
                                        return(
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}}>
                                                <FontAwesomeIcon icon={faFlag} className="xFlag-icon"/>
                                            </div>
                                        )
                                    } else if(node.isWall) {
                                        return (
                                            <div id="node" className="node node-wall" style={{animation: "node-animation 1s linear"}} onClick={() =>  handleNodeClicked(rowIndex,nodeIndex)}></div>
                                        )
                                    } else { 
                                        return (
                                            <div id="node" className="node" style={{animation: "node-animation 1s linear"}} onClick={() =>  handleNodeClicked(rowIndex,nodeIndex)}></div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>            
                <div id="grid-right" className="grid-right">
                    {
                        number ? 
                            <><div className="set-span">Click nodes to build walls</div></>:
                            <>
                                <span className="set-span">Enter the size of grid</span>
                                <input type="number" className="set-input" onChange={handleChange}/>
                                <button className="set-button" onClick={()=>handleButtonClicked(text)}>Set Size</button>
                                <div id="set-warning" className="set-warning">Enter the correct number</div>
                            </>
                    }
                </div>
            </div>
        </div>
      </>
  )
}
