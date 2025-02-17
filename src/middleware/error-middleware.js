const ResponseError = require("../error/response-error");
const errorMiddleware = async (err, req, res, next) => {
    const statusCodes = {
        100: "Continue",
        101: "Switching Protocols",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Long",
        415: "Unsupported Media Type",
        416: "Request Range Not Satisfiable",
        417: "Expectation Failed",
        422: "Unprocessable Entity",
        429: "Too Many Requests",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported",
    };
    if (!err) {
        next();
        return;
    }
    if (err instanceof ResponseError) {
        let message = err.message;
        console.log(`=> ${err.message}`);
        if(err.message === "" || err.message === undefined || err.message === null){
            message = statusCodes[`${err.status}`]
        }
        res.status(err.status).json({
            Message: {
                Code: err.status,
                Text: message
            },
            Data: err.data,
            Type: req.originalUrl
        }).end();
    }
    else {
        console.log(err);
        res.status(500).json({
            Message: {
                Code: 500,
                Text: "Internal Server Error"
            },
            Data: {
                Message: err.message
            },
            Type: req.originalUrl
        }).end();
    }
}

module.exports = {errorMiddleware};
