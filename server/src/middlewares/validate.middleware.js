import ApiError from "../utils/ApiError.js";

export const validateRequiredFields=(fields)=>{

return(req,res,next)=>{

const missing=[];

fields.forEach(field=>{

if(

req.body[field]===undefined ||

req.body[field]===""

){

missing.push(field);

}

});

if(missing.length){

return next(

new ApiError(

400,

`Missing fields : ${missing.join(", ")}`

)

);

}

next();

};

};