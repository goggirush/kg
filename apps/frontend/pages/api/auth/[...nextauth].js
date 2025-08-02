import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: 'openid profile email' } },
      profile(profile) {
        return {
          id: profile.oid ?? profile.sub ?? profile.email,
          name: profile.name,
          email: profile.email,
        };
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub; // may be profile.oid
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile?.oid) {
        token.sub = profile.oid; // Azure Object ID
      }
      return token;
    },
  }
};

export default NextAuth(authOptions);
