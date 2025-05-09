

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface UserWithPassword extends User {
  password: string;
}

// Get all users
export const getUsers = (): UserWithPassword[] => {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
  return [];
};

// Register a new user
export const register = (user: Omit<UserWithPassword, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(u => u.email === user.email)) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user object
  const newUser: UserWithPassword = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  // Save to localStorage
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Login function
export const login = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

// Check if user is logged in
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user') !== null;
  }
  return false;
};

// Get current user
export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
  }
  return null;
};

// Logout function
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};