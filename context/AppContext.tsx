import React, { createContext, useState, ReactNode } from 'react';

// Mendefinisikan tipe data untuk TypeScript
type User = { nama: string; email: string } | null;
type Role = 'peserta' | 'admin' | '';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  userRole: Role;
  setUserRole: (role: Role) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [userRole, setUserRole] = useState<Role>(''); 

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, userRole, setUserRole }}>
      {children}
    </AppContext.Provider>
  );
};