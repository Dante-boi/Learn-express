import { body, param, validationResult } from 'express-validator'

// Validering för användare
export const validateUser = [
    body('name')
        .trim.isLength({ min : 2, max: 50 })
        .withMessage('Namnet måste vara 2 - 50 tecken'),
    body('email')
        .trim
        .isEmail()
        .normalizeEmail()
        .withMessage('Ogiltig e-postadress'),
]

export const validateUserId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID måste vara ett postivit heltal')
]

// Middleware för att hantera valideringsfel
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next()
}
