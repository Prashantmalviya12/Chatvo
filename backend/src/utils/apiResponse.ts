type ApiResponseType = {
    statusCode: number;
    data: any;
    message?: string;
    success?: boolean;
};

const ApiResponse = ({ statusCode, data, message = "Success" }: ApiResponseType) => {
    const success = statusCode < 400;
    return { statusCode, data, message, success };
}

export { ApiResponse };