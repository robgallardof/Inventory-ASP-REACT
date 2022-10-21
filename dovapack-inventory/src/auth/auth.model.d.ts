export interface claim {
    name: string;
    value: string;
}

export interface credentialUser{
    email: string;
    password: string;   
}

export interface answerAutenticacion {
    token: string;
    expiration: Date;
}

export interface userDTO{
    id: string;
    email: string;
}