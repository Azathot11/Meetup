import React from 'react'
import classes from './MeetupDetail.module.css'
const MeetupDetail = (props) => {
    return (
        <section className={classes.detail}>
         <img src={props.meetupsData.image} alt={props.meetupsData.title}/>
            <h1>{props.meetupsData.title}</h1>
            <address>{props.meetupsData.address}</address>
            <p>{props.meetupsData.description}</p>
        </section>
    )
}

export default MeetupDetail
