import Link from "next/link";
import {
  Container,
  Heading,
  View,
  ButtonFilled,
  ButtonMinimal,
  Text,
  foundations,
} from "@go1d/go1d";
import Layout from "../components/layout/Layout";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import RegisterBlock from "../components/common/RegisterBlock";
import { useSession } from "next-auth/react";
import Header from "../components/layout/Header";

const code = `var request = require('request');
var options = {
  'method': 'PATCH',
  'url': 'https://public.qa.go1.cloud/v2/users/6580987',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJjNWRkZWEzZmVkNDI0ZjM5N2ZiMGFkYTRjYzRjODM1OWYxYTJhMzNlIiwianRpIjoiY2Y1MmY2ZmRhYjU4MmFkNzRkYTlkNmJlNTkwZGY0NzlhMmYzMjY0ODAyM2Q0MmI4OGQyNGRhMzcwYTFhYTVlMWI1ZjQwNGY1MjUwZGVlZDgiLCJpYXQiOjE2NDkzMDI2ODQsIm5iZiI6MTY0OTMwMjY4NCwiZXhwIjoxNjQ5MzQ1ODg0LCJzdWIiOiI2NTgwOTg1Iiwic2NvcGVzIjpbImFjY291bnQucmVhZCIsInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJsby5yZWFkIiwibG8ud3JpdGUiLCJlbnJvbGxtZW50LnJlYWQiLCJlbnJvbGxtZW50LndyaXRlIiwid2ViaG9vay5yZWFkIiwid2ViaG9vay53cml0ZSIsInBvcnRhbC5yZWFkIiwicG9ydGFsLndyaXRlIiwiZ3JvdXAucmVhZCIsImdyb3VwLndyaXRlIiwiYXBwLnJlYWQiLCJhcHAud3JpdGUiLCJ1c2VyLmxvZ2luLm1lIl19.If5kOsVqIVF7HBSKSJawgq_ka8li2PCq56shv39JTdLlrxKBNq-VwrCpJntYtM2fH3WWmdikYV0Qs2x4Xk9KeqzuwgFodwhZFivRgkO_Ho_tizVXufradyv14DMZygx9bEEAeaDQCmkzIKSr-CxKNtoJhpnjuZp7EyE3XzQnOCROMXAVFzFqxwEn1U816q4VFCEuaiZuT5JCw0QAaj9bZps_fAQeWjN5tGlnW7bXMFtQWlvsEpCkMA2T3g8qBxN9ok_9vha2bjzKx11kwZsHit4aIasvBTN41oXN4mdHeAcwWK0f6O463bVNY1sbeDfhPiRRK5Ii_xtQSOhBrcoADA'
  },
  body: JSON.stringify({
    "status": true
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});`;

const EXAMPLES = [
  {
    name: "Go1 Flix",
    description: "A netflix inspired UI for browsing Go1 content",
  },
  {
    name: "A week of Go1",
    description:
      "A simple mobile centered app to showcase your current learning progress",
  },
  {
    name: "Go1 Text Editor",
    description:
      "A drag and drop style builder for creating Go1 learning objects",
  },
  {
    name: "Go1 Flix",
    description: "A netflix inspired UI for browsing Go1 content",
  },
];

const featureImage =
  "https://images.unsplash.com/photo-1618556658017-fd9c732d1360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80";
const coverImage =
  "https://images.unsplash.com/photo-1618472609777-b038f1f04b8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80";

// const coverImage =
//   "https://images.unsplash.com/photo-1641912076734-626a72927483?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2255&q=80";

// const coverImage =
//   "https://images.unsplash.com/photo-1631477076114-9123f721b9dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout title="Home" withSidebar={false}>
      <View
        color="background"
        position="relative"
        overflow="hidden"
        css={{
          "&:before": {
            content: '" "',
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${coverImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: foundations.colors.accent,
            backgroundBlendMode: "luminosity",
          },
        }}
      >
        <Container
          zIndex={1}
          contain="wide"
          flexDirection={["column-reverse", "row"]}
          paddingY={[0, 10]}
          paddingX={[5, 0]}
          flexGrow={1}
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <View flexBasis={0.5}>
            <Heading
              semanticElement="h1"
              visualHeadingLevel="Heading 1"
              marginBottom={4}
              fontSize={8}
            >
              Build experiences to enhance learning
            </Heading>
            <Heading semanticElement="h4" visualHeadingLevel="Heading 4">
              Start integrating Go1's products and tools using our official API.
            </Heading>
            <View flexDirection="row" marginTop={8}>
              {!session ? (
                <Link href="/login">
                  <ButtonFilled color="complementary">Get Started</ButtonFilled>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <ButtonFilled color="complementary">
                    My Applications
                  </ButtonFilled>
                </Link>
              )}
              <ButtonMinimal color="background" marginLeft={3}>
                View Documentation
              </ButtonMinimal>
            </View>
          </View>
        </Container>
      </View>

      <View>
        <Container
          flexDirection={["column-reverse", "row"]}
          contain="wide"
          alignItems="center"
          paddingY={9}
          paddingX={[5, 0]}
        >
          <View width={700} borderRadius={4} order={[2, 1]} overflow="hidden">
            <CodeBlock text={code} language={"bash"} theme={atomOneDark} />
          </View>
          <View flexWrap="wrap" flexGrow={1} flexShrink={1} paddingLeft={8}>
            <Heading
              fontFamily="mono"
              semanticElement="h2"
              visualHeadingLevel="Heading 2"
              marginBottom={4}
            >
              Get started
            </Heading>
            <Text fontFamily="mono">
              With just a few lines of code, you can authenticate with go1 and
              start using the open API
            </Text>
          </View>
        </Container>
      </View>

      <View
        color="background"
        position="relative"
        overflow="hidden"
        height={200}
        css={{
          "&:before": {
            content: '" "',
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${featureImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: foundations.colors.accent,
            backgroundBlendMode: "luminosity",
          },
        }}
      ></View>

      <View id="resources" backgroundColor="faint">
        <Container contain="wide" paddingY={9} paddingX={[5, 0]}>
          <View
            marginX="auto"
            width={600}
            alignItems="center"
            marginBottom={6}
            css={{ textAlign: "center" }}
          >
            <Heading
              fontFamily="mono"
              semanticElement="h2"
              visualHeadingLevel="Heading 2"
              marginBottom={4}
            >
              Examples
            </Heading>
            <Text fontFamily="mono">
              Not sure where to start, check out some cool experiments built
              with the Go1 Open Api
            </Text>
          </View>
          <View
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {EXAMPLES.map((item, index) => (
              <View
                key={index}
                flexBasis={[1, 0.24]}
                height={200}
                marginBottom={6}
                padding={4}
                border={2}
                borderRadius={3}
                borderColor="contrast"
                justifyContent="center"
                alignItems="center"
                css={{
                  transition: "transform linear 0.2s",
                  "&:hover": {
                    transform: "scale(105%)",
                  },
                }}
              >
                <Heading semanticElement="h3" visualHeadingLevel="Heading 3">
                  {item.name}
                </Heading>
                <Text css={{ textAlign: "center" }}>{item.description}</Text>
              </View>
            ))}
          </View>
        </Container>
      </View>

      <View backgroundColor="accent" height={100}></View>
    </Layout>
  );
}
