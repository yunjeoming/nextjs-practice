import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';
import SignUpButton from './SignUpButton';
import DarkModeToggleButton from './DarkModeToggleButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-b h-14 px-4">
          <Link href="/" className="flex items-center">
            HOME
          </Link>
          <Link href="/list" className="flex items-center">
            목록
          </Link>
          <div className="flex items-center [&>*:not(:last-child)]:mr-2">
            {session ? (
              <LogOutButton />
            ) : (
              <>
                <LogInButton />
                <SignUpButton />
              </>
            )}
            <DarkModeToggleButton />
          </div>
        </div>
        <div className="min-h-[calc(100vh-56px)] bg-gray-100 dark:dark p-4">{children}</div>
      </body>
    </html>
  );
}
