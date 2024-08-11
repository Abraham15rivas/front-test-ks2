export default interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt?: string;
    isActive: boolean;
}