export class MainResponse<T>{
    message: string;
    status: number;
    path: string;
    data: T;
    constructor(message: string, status: number, path: string, data: T) {
        this.message = message;
        this.status = status;
        this.path = path;
        this.data = data;
    }

}