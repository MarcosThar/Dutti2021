interface User extends UserLogin {
    firstName: string;
    lastName: string;
    email: string;
}

interface UserLogin {
    username: string;
    password: string;
}
interface ResponseAuth {
    user: User,
    msg: string
}
export {UserLogin, User, ResponseAuth}

