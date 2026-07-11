function AICostGuard(options = {}) {

  const limit =
    options.maxTokens || 50000;


  return function(req,res,next){

    const prompt =
      req.body?.prompt || "";


    const tokens =
      Math.ceil(prompt.length / 4);


    if(tokens > limit){

      return res.status(429).json({

        error:
        "AI Cost Guard: Token limit exceeded",

        tokens

      });

    }


    req.aiCostGuard = {
      tokens
    };


    next();

  };

}


module.exports = AICostGuard;
