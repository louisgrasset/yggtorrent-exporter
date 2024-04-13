import axios from "axios";

import {formatUrl} from "./format-url.js";

export const proxyRequest = async (url) => {
    const requestData = {
        url, cmd: 'request.get', maxTimeout: 60000,
    };

    return axios.post(`${formatUrl(process.env.FLARESOLVERR_URL)}/v1`, requestData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(({data}) => {
        if (data.status === 'ok' && data?.solution?.status === 200) {
            return data.solution.response
        } else {
            return "<div></div>"
        }
    }).catch(() => {
        return "<div></div>"
    })
}
