import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/campaigns/:path*', '/api/campaigns/:path*', '/api/metrics/:path*', '/api/ingest/:path*', '/api/connectors/:path*'],
}; 