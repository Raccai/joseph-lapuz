import React, { useEffect, useState } from "react"
import {ArrowBigLeft, ArrowBigRight, CircleDot, Circle} from "lucide-react"
import { Link } from "react-router-dom";
import { useProjectsContext } from "../hooks/useProjectsContext";

export function Slider({slides}) {
    const [slideIndex, setSlideIndex] = useState(0);

    function showNextImg() {
        setSlideIndex(index => {
            if(index === slides.length - 1) return 0
            return index + 1
        })
    }

    function showPrevImg() {
        setSlideIndex(index => {
            if(index === 0) return slides.length - 1
            return index - 1
        })
    }

    return (
        <div className="img-slider">
            <div style={{height: "100%", width: "100%", overflow: "hidden", display: "flex"}}>
                {slides.map((slide, index) => (
                    <Link key={index} to={`/Project/${slide._id}`} className="img-slider-img" style={{translate: `${-100 * slideIndex}%`}}>
                        <img 
                            src={slide.items[0].imgUrl} 
                            alt={`Project ${index + 1}`}
                            style={{ width: "100%"}}
                        />
                    </Link>
                ))}
            </div>
            <button className="img-slider-arrow-btn" style={{left: 0}} onClick={showPrevImg}> 
                <ArrowBigLeft />
            </button>
            <button className="img-slider-arrow-btn" style={{right: 0}} onClick={showNextImg}>
                <ArrowBigRight />
            </button>

            <div className="img-slider-nav">
                {slides.map((_, index) => (
                    <button 
                        key={index}
                        className="img-slider-nav-btn"
                        onClick={() => {
                            setSlideIndex(index)
                        }}>
                        {index === slideIndex ? <CircleDot style={{transform: "scale(1.2)", stroke: "white", fill: "#D8979F"}} /> : <Circle />}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Slider;