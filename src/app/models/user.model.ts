export interface User {
  // id: number;
  name: string;
  email: string;
  id: string;
  // author: string;
  // description: string;
  // topic: string;
  // url: string;
}

export interface FilteredUser {

  id: string;
  name: string;

  highlightStart: number;

  highlightLength: number;
}
