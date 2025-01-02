import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },  
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;

        const authenticatedRoutes = 
        [
            '/dashboard',
            '/settings'
        ];
        
        const isOnAuthenticatedRoute = authenticatedRoutes.some(route => {

            console.log("pathname: " + nextUrl.pathname);
            console.log("route: " + route);

            return nextUrl.pathname.startsWith(route);
        })

        console.log(isOnAuthenticatedRoute);
      
        if (isOnAuthenticatedRoute) {
            if (isLoggedIn) 
                return true;
            return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;