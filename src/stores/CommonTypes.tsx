export interface FetchSuccessPayload<Type> {
    data: Array<Type>;
}

export interface FetchFailurePayload {
    error: string;
}

export interface CommonFetchBlob<T> {
    error: string | null;
    pending: boolean;
    data: T | undefined;
    count?: number;
}

export interface CommonFetch {
    type: any;
    apiCb: (params: any) => any;
    successCb: (action: any, payload: FetchSuccessPayload<any>) => any;
    errorCb: (action: any, payload: FetchFailurePayload) => any;
    params?: any;
    nextApiCb?: (params: any) => any;
}
