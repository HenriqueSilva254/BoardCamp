export function validateSchema(Schema){
    return (req, res, next) => {

        const validation = Schema.validate(req.body)

        if(validation.error) {
            const err = validation.error.details.map((detail) => detail.message);
            return res.status (400).send(err)
        }
        next()
    }
}