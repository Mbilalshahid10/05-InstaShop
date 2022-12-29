import React, { useState } from "react";
import './StarRating.css'
import { FaStar } from "react-icons/fa";
import RatingList from "./RatingComp";
// const StarRating = () => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   return (
//     <div className="star-rating">
//       {[...Array(5)].map((star, index) => {
//         index += 1;
//         return (
//           <button
//             type="button"
//             key={index}
//             className={index <= (hover || rating) ? "on" : "off"}
//             onClick={() => setRating(index)}
//             onMouseEnter={() => setHover(index)}
//             onMouseLeave={() => setHover(rating)}
//           >
//             <span className="star">&#9733;</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// };

const StarRating =()=>{
    const [rating , setRating] = useState(null);
    const [hover , setHover] = useState(null);
    return (
    <div>
        {[...Array(5)].map((star ,i)=>{
            const ratingValue = i+1;
            return (
                <label>
                <input
                type = "radio"
                name= "rating"
                value={ratingValue}
                onClick= {()=>setRating(ratingValue)}
                />
                <FaStar className="star" 
                color= {ratingValue < ( hover || rating ) ? "#ffc107" : "#e4e5e9" }  
                size = {100} 
                onMouseEnter = {()=>setHover(ratingValue)}
                onMouseLeave = {()=>setHover(nulll)}
                />
                </label>
            );
        })};
        <p>The Rating is {ratingValue}</p>
    </div>
    );
};

export default StarRating;