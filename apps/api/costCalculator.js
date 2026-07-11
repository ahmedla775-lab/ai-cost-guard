const models = {
  "gpt-5": {
    input: 1.25,
    output: 10
  },
  "gpt-4o-mini": {
    input: 0.15,
    output: 0.60
  },
  "claude-3": {
    input: 3,
    output: 15
  }
};


function calculateCost(model, inputTokens, outputTokens = 0){

  const pricing = models[model];

  if(!pricing){
    return {
      error:"Unknown model"
    };
  }


  const inputCost =
    (inputTokens / 1000000) * pricing.input;


  const outputCost =
    (outputTokens / 1000000) * pricing.output;


  return {
    model,
    inputTokens,
    outputTokens,
    estimatedCost:
      Number(inputCost + outputCost)
      .toFixed(6)
  };

}


module.exports = {
  calculateCost
};
