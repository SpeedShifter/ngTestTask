import { User, FilteredUser } from "src/app/models/user.model";

export interface UserList {
  users: User[];
  filter: string;
  filteredUsers: FilteredUser[];
}
