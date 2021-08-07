import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Stays from "./Stays";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from "@material-ui/core/styles";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

Modal.setAppElement("#root")

const useStyles = makeStyles({
    buttonStyle : {
        backgroundColor : "white",
        color : "rgb(92, 88, 88)", 
        borderRadius:"25px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 6px 0px" ,
        fontFamily:"Calibri",
        fontWeight:"550",
        fontSize:"19px",
        width: "350px",
        height:"50px",
        marginRight : "100px",
    },

    modalStyle : {
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 8px 0px" ,
        
        backgroundColor : "white",
        display : "block",
        width : "60%",
        margin : "5% 15%",
        height:"500px",
    },

    searchStyle : {
        borderRadius : "15px",
    },
    
    location : {
        border : "2px rgb(92, 88, 88) solid",
        borderRadius : "10px",
        marginTop : "5%",
    },
    List : {
        height: "80px",
        width : "500px",
    }
});

const Searchbar = (props) => {
   
    const classes = useStyles();

    const[modalIsOpen,setModalIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState("");
    const [selectedCity, setSelectedCity] = useState("city");
    const [selectedCountry, setSelectedCountry] = useState("country");
    const[guests,setGuests] = useState(0);


  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event,city,country) => {
    setSelectedCity(city);
    props.setSearch(city);
    setSelectedCountry(country);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addguests = () => {
      setGuests(guests+1);
      props.setNumguest(guests);
  }
  const subtractguests = () => {
      if(guests>1){
        setGuests(guests-1);
        props.setNumguest(guests);
      } 
 }
  
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()];
    }

    const locations = getUniqueListBy(Stays, 'city');

    return(
        <>
            <div>
            <Button onClick={() => setModalIsOpen(true)}  className={classes.buttonStyle}>
                Where do you want to go?
                <SearchIcon color="secondary" fontSize="large" />
            </Button>
                <Modal isOpen = {modalIsOpen} onRequestClose = {() => {setModalIsOpen(false)}} className={classes.modalStyle}  >
                <div className = "Locations">
                    <div className = "modal_top" >
                        <h2 className = "destination" > Choose your destination </h2>
                        <Button onClick ={() => setModalIsOpen(false) } color="secondary" variant="contained" className = {classes.searchStyle}  ><SearchIcon fontSize="small" /> Search </Button>
                    </div>
                     
                    <div className="nested_location" >
                    <List component="nav" >
                        <ListItem
                        button
                        onClick={handleClickListItem}
                        variant="outlined"  
                        className = {classes.location} 
                        >
                        <ListItemText primary="Location" secondary={`${selectedCity},${selectedCountry}`} />
                        </ListItem>
                        <ListItem
                        button
                        className = {classes.location}
                        >
                        <ListItemText primary="Guests" secondary={`${guests}guests`} />
                        </ListItem>
                        
                    </List>
                            <div className="addguest" >
                                <h3 className = "addheading" >Add Guests</h3>
                                    <div className = "addsub" >
                                        <Button onClick={subtractguests}  variant = "outlined" style = {{marginRight : "5px"}} > <RemoveIcon fontSize = "small"/> </Button>
                                        <Button onClick={addguests} variant = "outlined" style = {{marginLeft : "5px"}}  > <AddIcon  fontSize = "small" /> </Button>
                                    </div>
                            </div>
                            
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {(locations.map((val) => (
                        <MenuItem
                            className = {classes.List}
                            key={val.city}
                            onClick={(event) => handleMenuItemClick(event,val.city,val.country)}
                        >
                        <LocationOnIcon color="primary"  fontSize = "large" />  {`${val.city},${val.country}`}
                        </MenuItem>
                        )))}
                    </Menu>
                    </div>
                    </div>
                </Modal>     
            </div>
        </>
    );
    
}

export default Searchbar;