import React from "react";
import "./index.css";
import StarIcon from '@material-ui/icons/Star';

const Home = ({photo,type,rating,title}) => {
    return(
        <>
                <div className="apartment">
                    <img className="apartment_img" src={photo} alt="apartment_img" />
                    <div className="apartment_details" >
                        <p className="apartment_type" > {type} </p>
                        <div className="apartment_rating" >
                            <StarIcon fontSize="small" color="secondary" />
                            <p className="rating" >{rating}</p>
                        </div>
                        <p className="apartment_title" > {title} </p>
                    </div>
                </div>
         
        </>
    );
}

export default Home;