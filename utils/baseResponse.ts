export type BaseResponse<T> = {
    ErrorCode: number,
    Message: string,
    TotalCounts: number,
    Data: T
}