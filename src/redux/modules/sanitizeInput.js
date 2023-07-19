const sanitizeInput = (input) => {
    const regex = /[&<>"'/]/g;
    const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
    };

    return input.replace(regex, (match) => entities[match]);
};


export default sanitizeInput;