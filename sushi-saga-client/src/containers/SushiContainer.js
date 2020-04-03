import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  
  return (
    <Fragment>
      <div className="belt">
        {
          props.fourSushi.map(sushi => {
            return <Sushi 
            key={sushi.id}
            id={sushi.id} 
            img={sushi.img_url} 
            name={sushi.name} 
            price={sushi.price}
            eatSushi={props.eatSushi}
            />
          })
        }
        <MoreButton nextSushis={props.nextSushis}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer