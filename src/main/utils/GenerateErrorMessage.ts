const handleEdgeCases = (message, key = '') => {
    if (message.includes('Cast to Number')) {
        return `${key} must be a number!`;
    }
    if (message.includes('E11000 duplicate key error')) {
        return `${key} already exists`;
    }
    if (message.includes('verifyIdToken')) {
        return `Login failed, try again`;
    }
    return message;
};

export class GenerateErrorMessage {
    static keyList = [];

    static setAdditionalKeys(addnKeys) {
        GenerateErrorMessage.keyList = [...GenerateErrorMessage.keyList, ...addnKeys];
        return GenerateErrorMessage;
    }

    static generateErrMessage = (errMessage) => {
        for (const key of GenerateErrorMessage.keyList) {
            if (errMessage.toLowerCase().includes(key)) {
                if (errMessage.includes('Custom')) {
                    const message = errMessage.replace('Custom:', '');
                    return message;
                }
                if (errMessage.includes('User validation failed')) {
                    const errList = errMessage.replace('User validation failed:', '').split(',');
                    const errObj = errList.map((err) => {
                        const splt = err.split(': ');
                        return handleEdgeCases(splt[1], key);
                    });
                    return errObj[0];
                }
                return handleEdgeCases(errMessage, key);
            }
        }
        return handleEdgeCases(errMessage);
    };
}
