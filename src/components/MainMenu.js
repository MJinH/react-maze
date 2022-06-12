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
                                <div className="card-top">
                                <img src="data:image/jpeg;base64,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" alt="" className="card-img"/>
                                </div>
                                <div className="card-bottom">
                                    <span className="description">Introduction</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(2)}>
                                <div className="card-top">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHqqQ1OcWG9oitoUmjWPhdFjRalKuY3R8_A&usqp=CAU" alt="" className="card-img"/>
                                </div>
                                <div className="card-bottom">
                                <span className="description">Create a Maze</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(3)}>
                                <div className="card-top">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0rTqQ8N-q9zS7L2lVNDE0nyBXvUOAmTQRg&usqp=CAU" alt="" className="card-img"/>
                                </div>
                                <div className="card-bottom">
                                    <span className="description">Shortest Path</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(4)}>
                                <div className="card-top">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgGrgFUGbgnfBNf6Wp0bCl3_QKmJE2umGJw&usqp=CAU" alt="" className="card-img"/>
                                </div>
                                <div className="card-bottom">
                                    <span className="description">Breadth First Search</span>
                                </div>
                            </li>
                            <li className="menu-card" onClick={()=>setIndex(5)}>
                                <div className="card-top">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Q-tdrpI_bJ2D03KeybHtFG57XJy6M5_OzA&usqp=CAU" alt="" className="card-img"/>
                                </div>
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
