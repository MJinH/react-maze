import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Intro({setIndex}) {

  const handleClick = () => {
      setIndex(0)
  }

  return (
      <>
        <div className="icon-wrapper" onClick={() => handleClick()}><FontAwesomeIcon icon={faXmark} className="xmark-icon"/></div>
        <div className="intro-description">
            <p>
                The goal of this project is to write a program that will automatically generate and solve mazes. <br /> 
                Each time you run the program, it will generate and print a new random maze and the solution. <br />
                You will use depth-first search (DFS) and breadth-first search (BFS).
            </p>
            <p>
                A perfect maze is defined as a maze which has one and only one path from any point in the maze to any other point. <br />
                This means that the maze has no inaccessible sections, no circular paths, no open areas.
            </p>
            <p>
                Each search algorithm will begin at the starting room and search for the finishing room by traversing wall openings. <br />
                The search should terminate as soon as the finishing room is found. <br />
                For each search algorithm, you will output the order in which rooms were visited and indicate the shortest solution path from starting to finishing room.
            </p>
            <p>
                For the DFS and BFS solutions, the maze should be output twice, one for each algorithm. <br />
                The first maze output for each algorithm should show the order that the rooms were visited by the algorithm.
            </p>
        </div>
      </>
)
}
