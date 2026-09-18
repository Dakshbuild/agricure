import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|hi|pa|gu|mr|bn|ta|te|kn|ml|or|as|ur|sa|ne)/:path*']
};
