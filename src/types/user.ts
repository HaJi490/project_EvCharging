export interface CreateUserRequest { // POST /api/users 요청 시 보내는 데이터
    email: string;
    password: string;
    // ...
}

export interface UserDetailDto { // POST /api/users 응답으로 받는 데이터
    id: string;
    email: string;
    // ...
}