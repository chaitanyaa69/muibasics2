import { useEffect,useState } from "react";
import Carousel from "react-material-ui-carousel";
import Items from "./Items.tsx";

const App=()=>{
    const [items,setItems]=useState([]);

    useEffect(()=>{

        fetch("https://picsum.photos/v2/list?page=5&limit=3")
        .then((res)=>res.json())
        .then((data)=>{setItems(data)})
    },[])

    return (
        <Carousel >
            {
                items.map((item,index)=>(
                    <Items key={index} item={item} />
                ))
            }
        </Carousel>
    )

}
export default App;
