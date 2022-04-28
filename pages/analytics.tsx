import Image from "next/image";
import { View, Heading, Container, Text, foundations } from "@go1d/go1d";
import Layout from "../components/layout/Layout";
import { getSession, useSession } from "next-auth/react";

import GET_STARTED_IMAGE from "../public/get-started.png";
import GRAPH_IMAGE from "../public/graph.png";

function Dashboard() {
  const { data: session } = useSession();

  return (
    <Layout title="Dashboard" withHeader={false}>
      <View paddingY={8}>
        <Container
          contain="normal"
          flexDirection={["column", "row"]}
          paddingX={[6, 6]}
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="accent"
          color="background"
          borderRadius={3}
          css={{
            cursor: "pointer",
            transition: "transform linear 0.1s",
            ":hover": {
              boxShadow: foundations.shadows.distant,
              transform: "scale(1.01)",
            },
          }}
        >
          <View flexBasis={0.5} alignItems={["center", "flex-start"]}>
            <Heading
              semanticElement="h3"
              visualHeadingLevel="Heading 3"
              marginBottom={4}
            >
              Get started
            </Heading>
            <Text>Create new client credentials for your Go1 integration</Text>
          </View>
          <View>
            <Image
              src={GET_STARTED_IMAGE}
              placeholder="blur"
              width={250}
              height={250}
            />
          </View>
        </Container>
      </View>

      <View>
        <Container contain="normal" paddingY={6} paddingX={[6, 0]}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={4}
          >
            <Heading
              semanticElement="h3"
              visualHeadingLevel="Heading 3"
              color="default"
            >
              Analytics
            </Heading>
          </View>
          <Image src={GRAPH_IMAGE} />
        </Container>
      </View>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Dashboard;
