const key_list = ['email', 'name', 'age']

const handleEdgeCases = (message, key="") => {
    if(message.includes('Cast to Number')) {
        return `${key} must be a number!`;
    }
    if(message.includes('E11000 duplicate key error')) {
        return `${key} already exists`
    }
    if(message.includes('verifyIdToken')) {
        return `Login failed, try again`;
    }
    return message;
};

export class GenerateErrorMessage {
    static keyList = [];

    static setAdditionalKeys(addnKeys) {
        this.keyList = [...this.keyList, ...addnKeys];
        return GenerateErrorMessage;
    }

    static generateErrMessage = (err_message) => {
        for(const key of GenerateErrorMessage.keyList) {
            const lower_message = err_message.toLowerCase();
            if(lower_message.includes(key)) {
                if(err_message.includes('Custom')) {
                    const message = err_message.replace('Custom:', '');
                    return message;
                } 
                if(err_message.includes('User validation failed')) {
                    const err_list = err_message.replace('User validation failed:', '').split(',');
                    const err_obj = err_list.map(err => {
                        const splt = err.split(': ');
                        return handleEdgeCases(splt[1], key);
                    });
                    return err_obj[0];
                }
                return handleEdgeCases(err_message, key);
            }
        }
        return handleEdgeCases(err_message);
    };
};