import React, { useState } from "react";
import {makeStyles} from "@material-ui/core"
import GameCard, { IGameCard } from "./GameCard";


interface DropZoneProps {
    cardData?: IGameCard;
}


const useStyles = makeStyles({
    DropZone: {
        height: "360px",
        width: "260px",
        borderRadius: "15px",
        border: "white 1px dashed",
        display: "grid",
        placeItems: "center",
        transition: "0.3s",
        "& *": {
            userSelect: "none"
        }
    }

});

const DropZone = (props: DropZoneProps) => {

    const [card, setCard] = useState(props.cardData);
    const [dragging, setDragging] = useState(false);
    const [dropHover, setDropHover] = useState(false);
    const classes = useStyles();

    const handleOnDrop = (e: React.DragEvent) => {
        e.preventDefault();
        
        setDropHover(false)
        if (e.dataTransfer.dropEffect !== "none") {
            const data = e.dataTransfer.getData("text/json");
            console.log("DATA: \n" + data);
            setCard(JSON.parse(data));
            console.log(data);
        }
    }

    const handleDragEnd = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        setDropHover(false)

        if (e.dataTransfer.dropEffect === "move") {
            setCard(undefined);
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        if (!dragging) {
            e.preventDefault()
            setDropHover(true)
        }
    }

    return (
        <div className={classes.DropZone} style={{background: (dropHover ? "#4CAF50" : "transparent")}} 
        onDragStart={() => setDragging(true)} 
        onDragOver={handleDragOver} 
        onDragLeave={() => setDropHover(false)}
        onDragEnd={handleDragEnd}
        onDrop={handleOnDrop} >
            {card ? <GameCard GameCardData={card} /> : <h1>DropZone</h1>}
        </div>
    )
}

export default DropZone;