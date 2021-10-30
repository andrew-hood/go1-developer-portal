import Head from 'next/head'
import Link from 'next/link';
import { ButtonMinimal, Container, Heading, View } from '@go1d/go1d'
import { useSession, signOut } from 'next-auth/react';

function Layout({ title, children }) {
  const { data: session } = useSession();

  return (
    <View
      backgroundColor="background"
      color="white"
    >
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <View height="100vh">
        <View 
          paddingY={4}
          paddingX={8}
        >
          <Container contain="wide" flexDirection="row" alignItems="center" justifyContent="space-between">
            <View flexDirection="row" color="complementary">
              <Link href="/">
                <Heading fontFamily="mono" semanticElement="h4" visualHeadingLevel="Heading 4">Go1 Developer Portal</Heading>
              </Link>
            </View>
            {!session ? (
              <View flexDirection="row">
                <ButtonMinimal color="white">Documentation</ButtonMinimal>
                <ButtonMinimal color="white">Resources</ButtonMinimal>
                <Link href="/register"><ButtonMinimal color="white">Register</ButtonMinimal></Link>
                <Link href="/login"><ButtonMinimal border={1} color="complementary">Login</ButtonMinimal></Link>
              </View>
            ) : (
              <ButtonMinimal border={1} color="complementary" onClick={() => signOut({ callbackUrl: '/' })}>Logout</ButtonMinimal>
            )}
          </Container>
        </View>
        <View flexGrow={1} flexShrink={1}>
          {children}
        </View>
      </View>
    </View>
  )
}

export default Layout;