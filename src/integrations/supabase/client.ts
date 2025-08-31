// Mock Supabase client for demo purposes
// Replace with actual @supabase/supabase-js when fully integrated

interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
}

interface AuthResponse {
  data: { user?: User; session?: Session };
  error?: Error;
}

interface SessionResponse {
  data: { session?: Session };
}

const mockUser: User = {
  id: 'demo-user',
  email: 'demo@example.com'
};

let currentUser: User | null = null;
let authListeners: ((event: string, session: Session | null) => void)[] = [];

export const supabase = {
  auth: {
    signUp: async ({ email, password }: { email: string; password: string }): Promise<AuthResponse> => {
      // Mock sign up
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { ...mockUser, email };
      currentUser = user;
      const session = { user };
      
      // Notify listeners
      authListeners.forEach(listener => listener('SIGNED_IN', session));
      
      return { data: { user, session } };
    },
    
    signInWithPassword: async ({ email, password }: { email: string; password: string }): Promise<AuthResponse> => {
      // Mock sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { ...mockUser, email };
      currentUser = user;
      const session = { user };
      
      // Notify listeners
      authListeners.forEach(listener => listener('SIGNED_IN', session));
      
      return { data: { user, session } };
    },
    
    signOut: async (): Promise<{ error?: Error }> => {
      currentUser = null;
      authListeners.forEach(listener => listener('SIGNED_OUT', null));
      return {};
    },
    
    getSession: async (): Promise<SessionResponse> => {
      const session = currentUser ? { user: currentUser } : null;
      return { data: { session } };
    },
    
    onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
      authListeners.push(callback);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              authListeners = authListeners.filter(listener => listener !== callback);
            }
          }
        }
      };
    }
  }
};