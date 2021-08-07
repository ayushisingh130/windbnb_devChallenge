import React,{useState,useEffect} from "react";
import Stays from "./Stays";
import Searchbar from "./Searchbar";
import Home from "./Home";


const App = () => {

    const[search,setSearch] = useState("");
    const[numguest,setNumguest] = useState("");
    const[item,setItem] = useState([]);

    useEffect(() => {
        if(search === ""){
            setItem(Stays);
        }

        else{
            let temparray = Stays.filter((stay) =>
                stay.city === search && numguest <= stay.maxGuests
            )
            setItem(temparray);
        }

    }, [search,numguest]);

   return(
        <>
            <div className="container" >
                <div className = "top">
                <img src="./images/logo.png" alt= "windbnb_logo" className="main_logo"/>
                    <div className = "searchloc" >
                    <Searchbar setSearch = {setSearch} setNumguest = {setNumguest} />
                    </div>   
                </div>
            
                {search===""?<h1 className = "top_heading" >{"Stays in finland"}</h1>:<h1 className = "top_heading" >{search}</h1>}
                <div className = "main_div" > 
                    {item.map((val,index) => 

                            (<Home
                            key = {index}
                            superHost={val.superHost}
                            title={val.title}
                            rating={val.rating}
                            maxGuests={val.maxGuests}
                            type={val.type}
                            beds={val.beds}
                            photo={val.photo}
                            city = {val.city}
                            />)                      
                    )}
                </div>
            </div>
        </>
    );
        
}


export default App;
