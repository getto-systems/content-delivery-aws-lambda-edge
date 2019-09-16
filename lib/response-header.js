'use strict';

exports.handler = async (event) => {
    const response = event.Records[0].cf.response;
    let headers = response.headers;

    Object.keys(headers).forEach((raw) => {
        const lower = raw.toLowerCase();
        const pattern = /^x-amz-meta-header-/;
        if (lower.match(pattern)) {
            const key = lower.replace(pattern, "");
            headers[key] = [{
                key: key,
                value: headers[raw][0].value,
            }];
        }
    });

    return response;
};

