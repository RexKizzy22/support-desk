// User schema
export interface IUser {
  id?: number;
  token?: string;
  name?: string;
  email: string;
  password?: string;
}

/**
 * Get a new User object.
 *
 * @returns
 */
function getNew(name: string, email: string, password: string): IUser {
  return {
    id: -1,
    email,
    name,
    password,
  };
}

/**
 * Copy a user object.
 *
 * @param user
 * @returns
 */
function copy(user: IUser): IUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password
  };
}

// Export default
export default {
  new: getNew,
  copy,
};
