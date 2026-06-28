import ApiResponse from "./ApiResponse.js";

const sendResponse = (

    res,

    statusCode,

    data,

    message

) => {

    return res
        .status(statusCode)
        .json(
            new ApiResponse(
                statusCode,
                data,
                message
            )
        );

};

export default sendResponse;