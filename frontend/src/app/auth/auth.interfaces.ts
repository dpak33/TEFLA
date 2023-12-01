export interface SignInResponse {
    message: string;
    firstTimeSignIn?: boolean;
    completedQuiz?: boolean;
    username:string
}
