export const ERROR_TO_IGNORE = Symbol("err_ignore");
export const ERROR_TO_DISPLAY = Symbol("err_display");
export const ERROR_NONE = Symbol("err_none");

export const AppError = {
    type: ERROR_NONE,
    message: undefined,
    innerError: undefined,
    fallbackLink: undefined
};

export const constructError = (type = ERROR_NONE, message = "Error occured", innerError = "", fallbackLink = "www.typingchild.com") => {
    return Object.assign(AppError, {type, message, innerError, fallbackLink});
};
