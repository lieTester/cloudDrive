import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { type AppType } from "next/app";

const App: AppType<{ session: Session | null }> = ({
   Component,
   pageProps: { session, ...pageProps },
}) => {
   return (
      <SessionProvider session={session}>
         <Component {...pageProps} />
      </SessionProvider>
   );
};

export default App;
