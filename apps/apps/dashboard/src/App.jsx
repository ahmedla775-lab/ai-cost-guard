import { useEffect, useState } from "react";
import supabase from "./supabase";


function App(){

const [stats,setStats] = useState({
requests:0,
cost:0,
models:0
});


useEffect(()=>{

async function loadData(){

const {data,error}= await supabase
.from("api_requests")
.select("*");


if(error){
console.log(error);
return;
}


const totalRequests =
data.length;


const totalCost =
data.reduce(
(sum,item)=> sum + Number(item.cost || 0),
0
);


const models =
new Set(
data.map(item=>item.model)
).size;


setStats({
requests:totalRequests,
cost:totalCost.toFixed(4),
models
});


}


loadData();


},[]);



return (

<div className="container">

<h1>
AI Cost Guard
</h1>


<div className="cards">

<div className="card">
<h3>Total Requests</h3>
<p>{stats.requests}</p>
</div>


<div className="card">
<h3>Total Cost</h3>
<p>${stats.cost}</p>
</div>


<div className="card">
<h3>AI Models</h3>
<p>{stats.models}</p>
</div>


</div>


</div>

)

}


export default App;
