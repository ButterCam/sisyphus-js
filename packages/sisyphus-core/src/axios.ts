import {IRpcImpl} from "./client"
import ax, {AxiosRequestConfig, AxiosResponse} from "axios"
import {
    IHttpImpl,
    IHttpRequest,
    IHttpResponse,
    ITranscodingConfig,
    serializeParam,
    transcoding as baseTranscoding
} from "./transcoding"

function convertResponse(response: AxiosResponse): IHttpResponse {
    return {
        status: response.status,
        headers: response.headers,
        body: response.data
    }
}

export function axios(host: string): IHttpImpl {
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const requestConfig: AxiosRequestConfig = {
            baseURL: host,
            headers: request.headers,
            responseType: request.bodyType == "protobuf" ? "arraybuffer" : "json",
            method: <any>request.method,
            params: request.params,
            paramsSerializer: serializeParam,
            url: request.url,
            data: request.body
        }

        try {
            const response = await ax.request(requestConfig)
            return convertResponse(response)
        } catch (e) {
            if (e.response) {
                return convertResponse(e.response)
            } else {
                throw e
            }
        }
    }
}

export let transcoding = function (host: string, config?: ITranscodingConfig): IRpcImpl {
    return baseTranscoding(axios(host), config)
}
