import Image from 'next/image'
import Link from 'next/link'
import { Container, Heading, View, ButtonFilled, ButtonMinimal, Text } from '@go1d/go1d'
import Layout from '../components/common/layout'
import { CodeBlock, atomOneDark } from "react-code-blocks";
import RegisterBlock from '../components/common/RegisterBlock';
import { useSession } from 'next-auth/react';

const code = `import { useLogin } from "@go1/auth"

const App = () => {
  const clientId = process.env.ClientID;
  const {
    token, 
    isLoggedIn,
    doLogin,
  } = useLogin(clientId);

  return (
    <Button onClick={doLogin}>Login</Button>
  )
}`;

const EXAMPLES = [
  { name: 'Go1 Flix', description: 'A netflix inspired UI for browsing Go1 content' },
  { name: 'A week of Go1', description: 'A simple mobile centered app to showcase your current learning progress' },
  { name: 'Go1 Text Editor', description: 'A drag and drop style builder for creating Go1 learning objects' },
  { name: 'Go1 Flix', description: 'A netflix inspired UI for browsing Go1 content' },
]

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout title="Home">
      <View>
        <Container
          contain="wide"
          flexDirection="row"
          paddingY={9}
          alignItems="center"
          justifyContent="space-between"
        >
          <View flexBasis={0.5}>
            <Heading fontFamily="mono" semanticElement="h2" visualHeadingLevel="Heading 2" marginBottom={4}>A better developer experience.</Heading>
            <Heading fontFamily="mono" semanticElement="h2" visualHeadingLevel="Heading 2">Build great apps with Go1.</Heading>
            {!session ? (
              <View flexDirection="row" marginTop={8}>
                <Link href="/login"><ButtonFilled color="complementary">Login</ButtonFilled></Link>
                <ButtonMinimal border={2} color="white" marginLeft={3}>Documentation</ButtonMinimal>
              </View>
            ) : (
              <View flexDirection="row" marginTop={8}>
                <Link href="/dashboard"><ButtonFilled color="complementary">Dashboard</ButtonFilled></Link>
              </View>
            )}
          </View>
          <View>
            <Image src="/get-started.png" width={500} height={500} />
          </View>
        </Container>
      </View>

      <View backgroundColor="black">
        <Container
          flexDirection="row"
          contain="wide"
          alignItems="center"
          paddingY={9}
        >
          <View 
            width={600}
            borderRadius={4}
            overflow="hidden"
          >
            <CodeBlock
              text={code}
              language={'jsx'}
              theme={atomOneDark}
            />
          </View>
          <View flexWrap="wrap" flexGrow={1} flexShrink={1} paddingLeft={8}>
            <Heading fontFamily="mono" semanticElement="h2" visualHeadingLevel="Heading 2" marginBottom={4}>Get started</Heading>
            <Text fontFamily="mono">With just a few lines of code, you can authenticate with go1 and start using the open API</Text>
          </View>
        </Container>
      </View>
      
      <View backgroundColor="background">
        <Container
          contain="wide"
          paddingY={9}
        >
          <View marginX="auto" width={600} alignItems="center" marginBottom={6} css={{ textAlign: 'center' }}>
            <Heading fontFamily="mono" semanticElement="h2" visualHeadingLevel="Heading 2" marginBottom={4}>Use cases</Heading>
            <Text fontFamily="mono">Not sure where to start, check out some cool experiments built with the Go1 Open Api</Text>
          </View>
          <View flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {EXAMPLES.map((item, index) => (
              <View
                key={index}
                flexBasis={0.48}
                height={200}
                marginBottom={6}
                padding={4}
                border={2}
                borderRadius={3}
                borderColor="white"
                justifyContent="center"
                alignItems="center"
                css={{
                  transition: 'transform linear 0.2s',
                  '&:hover': {
                    transform: 'scale(105%)'
                  }
                }}
              >
                <Heading semanticElement="h3" visualHeadingLevel="Heading 3">{item.name}</Heading>
                <Text css={{ textAlign: 'center' }}>{item.description}</Text>
              </View>
            ))}
          </View>
        </Container>
      </View>

      <RegisterBlock />
    </Layout>
  )
}
