import Head from "next/head";
import Link from "next/link";
import { ButtonMinimal, Container, Heading, View } from "@go1d/go1d";
import { useSession, signOut } from "next-auth/react";
import SideMenu from "./SideMenu";
import Header from "./Header";

function Layout({ title, withSidebar = true, withHeader = true, children }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {withHeader && <Header />}
      <View flexDirection="row">
        {withSidebar && <SideMenu menu={[]} />}
        <View flexGrow={1} flexShrink={1}>
          {children}
        </View>
      </View>
    </>
  );

  // return (
  //   <View backgroundColor="background" color="contrast">
  //     <Head>
  //       <title>{title}</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <View height="100vh">
  //       {withHeader && (
  //         <View paddingY={4} paddingX={8} backgroundColor="faint">
  //           <Container
  //             contain="wide"
  //             flexDirection="row"
  //             alignItems="center"
  //             justifyContent="space-between"
  //           >
  //             <View flexDirection="row" color="complementary">
  //               <Link href="/">
  //                 <Heading
  //                   fontFamily="mono"
  //                   semanticElement="h4"
  //                   visualHeadingLevel="Heading 4"
  //                 >
  //                   Go1 Developer Portal
  //                 </Heading>
  //               </Link>
  //             </View>
  //             {!session ? (
  //               <View flexDirection="row" display={["none", "flex"]}>
  //                 <ButtonMinimal
  //                   target="_blank"
  //                   href="https://developers.go1.com/"
  //                   color="contrast"
  //                 >
  //                   Documentation
  //                 </ButtonMinimal>
  //                 <Link href="/#resources">
  //                   <ButtonMinimal color="contrast">Examples</ButtonMinimal>
  //                 </Link>
  //                 <Link href="/#register">
  //                   <ButtonMinimal color="contrast">Register</ButtonMinimal>
  //                 </Link>
  //                 <Link href="/login">
  //                   <ButtonMinimal border={1} color="complementary">
  //                     Login
  //                   </ButtonMinimal>
  //                 </Link>
  //               </View>
  //             ) : (
  //               <ButtonMinimal
  //                 border={1}
  //                 color="complementary"
  //                 onClick={() => signOut({ callbackUrl: "/" })}
  //               >
  //                 Logout
  //               </ButtonMinimal>
  //             )}
  //           </Container>
  //         </View>
  //       )}
  //       <View flexGrow={1} flexShrink={1}>
  //         {children}
  //       </View>
  //     </View>
  //   </View>
  // );
}

export default Layout;
