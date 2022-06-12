import React from 'react'
import Generate from './Generate'
import Intro from './Intro'
import ShowPaths from './ShowPaths'

export default function Options({index,setIndex,grids,setGrids,number,setNumber,changed,setChanged}) {


  const render = (index) => {
    if(index === 1 ){
      return (
        <Intro 
          setIndex={setIndex}
        />
      )
    } else if(index === 2) {
      return (
        <Generate
          setIndex={setIndex}
          grids={grids}
          setGrids={setGrids}
          number={number}
          setNumber={setNumber}
          changed={changed}
          setChanged={setChanged}
        />
      )
    } else {
      return (
        <ShowPaths
          setIndex={setIndex}
          index={index}
        />
      )
    } 
  }

  return (
    <>
      <div className="option-container">
        <div className="option-wrapper">
          {render(index)}
        </div>
      </div>
    </>
  )
}
