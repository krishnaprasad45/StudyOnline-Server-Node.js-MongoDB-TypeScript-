// export interface message {
//     from: string
//     message: string
//     timestamp: string
// }

// export interface chat {
//     chatId: string,
//     message: {
//         from: string
//         message: string
//         to:string
//         id:string
//         timestamp: string
//         chatId:string
//     }
// }

interface IMessage {
    private _id(_id: any): unknown;
    from: string;
    to: string;
    message: string;
    // timestamp: Date;
    id: string;
    // chatId: string;
}

// message: string; to: string; from: string; id: number