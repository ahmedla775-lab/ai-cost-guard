const supabase = require("./supabase");
const { calculateCost } = require("./costCalculator");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    name: "AI Cost Guard API",
    status: "running",
    version: "1.0.0"
  });
});


app.post("/api/analyze", async (req,res)=>{

  const {prompt, model} = req.body;


  if(!prompt){
    return res.status(400).json({
      error:"Prompt is required"
    });
  }


  const estimatedTokens =
    Math.ceil(prompt.length / 4);


  const cost =
    calculateCost(
      model || "gpt-5",
      estimatedTokens
    );

await supabase
.from("api_requests")
.insert({
  model: model || "gpt-5",
  input_tokens: estimatedTokens,
  output_tokens: 0,
  cost: cost.estimatedCost,
  endpoint: "/api/analyze"
});
  res.json({

    characters: prompt.length,

    estimatedTokens,

    cost

  });

});


const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>{
  console.log(
    `AI Cost Guard API running on ${PORT}`
  );
});
