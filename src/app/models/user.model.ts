export interface User {
    id: number;
    nombres: string;
    correo: string;
    dni: string;
    contraseña: string;
    created_at: string;
  }
  
  export interface LoginResponse {
    message: string;
    usuario: User;
  }
  