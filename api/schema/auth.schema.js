import Joi from "joi";

export const signupSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z]+ [a-zA-Z]+$"))
    .required()
    .messages({
      "string.base": "Full name should be a type of text",
      "string.empty": "Full name cannot be empty",
      "string.min": "Full name should have a minimum length of 3 characters",
      "string.max": "Full name should have a maximum length of 50 characters",
      "string.pattern.base":
        "Full name must include a space between the first name and the father name, and contain only letters",
      "any.required": "Full name is a required field",
    }),

  userName: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "Username should be a type of text",
    "string.empty": "Username cannot be empty",
    "string.alphanum": "Username must only contain alpha-numeric characters",
    "string.min": "Username should have a minimum length of 3 characters",
    "string.max": "Username should have a maximum length of 30 characters",
    "any.required": "Username is a required field",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email should be a type of text",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is a required field",
    }),

  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.base": "Password should be a type of text",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have a minimum length of 8 characters",
      "string.max": "Password should have a maximum length of 30 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
      "any.required": "Password is a required field",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email should be a type of text",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is a required field",
    }),

  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.base": "Password should be a type of text",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have a minimum length of 8 characters",
      "string.max": "Password should have a maximum length of 30 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
      "any.required": "Password is a required field",
    }),
});
