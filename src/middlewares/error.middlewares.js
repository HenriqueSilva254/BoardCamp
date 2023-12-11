import httpStatus from "http-status";

export function errorHandler(error, req, res, next) {
    console.log(error);

    if (error.type === "conflict") {
        return res.status(httpStatus.CONFLICT).send(error.message);
    }

    if (error.type === "notFound") {
        return res.status(httpStatus.CONFLICT).send(error.message);
    }

    if (error.type === "incompleteData") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }

    if (error.type === "invalidId") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message)
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
}