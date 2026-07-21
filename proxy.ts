import { withAuth } from 'next-auth/middleware';

// ponytail: protect only admin pages that require authentication, keeping login page excluded
export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: [
    '/admin',
    '/admin/licenses/:path*',
    '/admin/customers/:path*',
  ],
};
