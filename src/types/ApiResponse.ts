import {Message} from "@/model/user";
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean;
    messages?: Message[];
}