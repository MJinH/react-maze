import React from 'react'
import {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Options from './Options';

export default function MainMenu() {

    
  const [index,setIndex] = useState(0)
  const [grids,setGrids] = useState([])
  const [number,setNumber] = useState(0)
  const [changed,setChanged] = useState(false)
  const [isExceed,setIsExceed] = useState(false)
  const arrowPrev = document.getElementsByClassName("arrow-inner")


  useEffect(() => {
    const menuList = document.getElementsByClassName("menu-list")
    const menuCrad = document.getElementsByClassName("menu-card")
    let activeLi = menuList[0].getAttribute('data-position')
    if(menuList[0].clientWidth <= (menuCrad.length * 240 + Number(activeLi))) {
        setIsExceed(true)
    }
  },[])

  useEffect(() => {

        const generateGrids = () => {
            let grid = []
            for(let row = 0; row < number; row++) {
                let node = []
                for(let col = 0; col < number; col++){
                    node.push(createNode(row,col))
                }
                grid.push(node)
            }
            return grid
        }

        setGrids(generateGrids())

    },[number])
    

    
  const createNode = (row,col) => {
      return {
          row,
          col,
          isWall:false,
          bfsPath:false,
          dfsPath:false,
          visited:false,
          shortestPath:false,
          previousNode: null,
          distance: 10000
      }
  }

  const handlePrevClick = () => {
    const menuList = document.getElementsByClassName("menu-list")
    const menuCrad = document.getElementsByClassName("menu-card")
    let activeLi = menuList[0].getAttribute('data-position')
    if(menuList[0].clientWidth <= (menuCrad.length * 240 + Number(activeLi))) {

        activeLi = Number(activeLi) - 240


        const arrow = document.getElementsByClassName("arrow-inner")
        arrow[1].style.backgroundColor = "rgb(47, 48, 89)"
        arrow[0].style.backgroundColor = "rgba(25, 42, 70, 0.2)"
    }

    

    menuList[0].style.transition = 'transform 1s'
    menuList[0].style.transform = 'translateX(' + String(activeLi) + 'px)'
    menuList[0].setAttribute('data-position',activeLi)
  }

  const handleNextClick = () => {
    const menuList = document.getElementsByClassName("menu-list")
    let activeLi = menuList[0].getAttribute('data-position')

    if(Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 240

        const arrow = document.getElementsByClassName("arrow-inner")
        arrow[1].style.backgroundColor = "rgba(25, 42, 70, 0.2)"
        arrow[0].style.backgroundColor = "rgb(47, 48, 89)"
    }

    menuList[0].style.transition = 'transform 1s'
    menuList[0].style.transform = 'translateX(' + String(activeLi) + 'px)'
    menuList[0].setAttribute('data-position',activeLi)
  }


  return (
    <>
        {
            index === 0 ? 
                <div className="main-menu-container">
                    <div className="main-menu-wrapper">
                        <div className="arrow-container">
                            <div className="arrow-left"></div>
                            <div className="arrow-right">
                                <div className={`arrow-inner arrow-prev`} style={{backgroundColor:"rgb(47, 48, 89)"}} onClick={handlePrevClick}>
                                    <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon"/>
                                </div>
                                <div className="arrow-inner arrow-next" onClick={handleNextClick}>
                                    <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
                                </div>
                            </div>
                        </div>
                        <ul className="menu-list" data-position="0">
                            <li className="menu-card" onClick={()=>setIndex(1)}>
                                <img src="/img/intro.jpg" alt="" className="card-img"/>
                                <div className="card-bottom">
                                    <span className="description">Introduction</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(2)}>
                                <img src="/img/create.jpg" alt="" className="card-img"/>
                                <div className="card-bottom">
                                <span className="description">Create a Maze</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(3)}>
                                <img src="/img/shortest.jpg" alt="" className="card-img"/>
                                <div className="card-bottom">
                                    <span className="description">Shortest Path</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(4)}>
                                <img src="/img/BFS.jpg" alt="" className="card-img"/>
                                <div className="card-bottom">
                                    <span className="description">Breadth First Search</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(5)}>
                                <img src="/img/DFS.jpg" alt="" className="card-img"/>
                                <div className="card-bottom">
                                    <span className="description">Depth First Search</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            :
                <Options
                    index={index}
                    setIndex={setIndex}
                    grids={grids}
                    setGrids={setGrids}
                    number={number}
                    setNumber={setNumber}
                    changed={changed}
                    setChanged={setChanged}
                />
        }
    </>
  )
}
