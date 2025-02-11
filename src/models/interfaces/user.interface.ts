export interface UserInterface {
  id: number,
  name: string,
  email: string,
  cpf: string,
  isVisitor?: boolean,
  avatarUrl: string,
  status: boolean,
}