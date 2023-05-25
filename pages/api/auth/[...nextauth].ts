import NextAuth, { SessionStrategy } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectDB } from '@/util/database';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      // 로그인페이지 폼 자동생성
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      // 로그인 요청시 실행
      // 아이디,비번 맞으면 return 결과, 틀리면 return null
      async authorize(credentials) {
        const { email, password } = credentials!;
        const db = (await connectDB).db('forum');
        const dbUser = await db.collection('user').findOne({ email });
        if (!dbUser) {
          return null;
        }
        const user = {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          password: dbUser.password,
        };
        if (!user) {
          return null;
        }
        const pwcheck = await bcrypt.compare(password, user.password);
        if (!pwcheck) {
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, //30일
  },
  callbacks: {
    // jwt 만들 때 실행되는 코드
    // token.user에 db user를 저장
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    // 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
