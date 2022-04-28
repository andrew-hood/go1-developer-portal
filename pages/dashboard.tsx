import Image from "next/image";
import {
  View,
  Heading,
  ButtonFilled,
  Container,
  ButtonMinimal,
  Text,
  SpotIcon,
  NotificationManager,
  Pill,
  foundations,
} from "@go1d/go1d";
import { useEffect, useState } from "react";
import {
  getAuthClients,
  updateAuthClient,
  ClientApp,
  deleteAuthClient,
  getClientAccessToken,
} from "../services/authService";
import Layout from "../components/layout/Layout";
import { getSession, useSession } from "next-auth/react";
import SecretText from "../components/common/SecretText";
import IconPlus from "@go1d/go1d/build/components/Icons/Plus";
import useModalWithClient from "../hooks/useModalWithClient";
import StateDropdown from "../components/common/dropdown";
import IconEdit from "@go1d/go1d/build/components/Icons/Edit";
import IconNotPassed from "@go1d/go1d/build/components/Icons/NotPassed";
import IconPassed from "@go1d/go1d/build/components/Icons/Passed";
import IconTrash from "@go1d/go1d/build/components/Icons/Trash";

import GET_STARTED_IMAGE from "../public/get-started.png";
import useModalWithClientLogin from "../hooks/useModalWithClientLogin";

function Dashboard() {
  const { data: session } = useSession();
  const [clients, setClients] = useState<ClientApp[]>(null);

  useEffect(() => {
    if (session?.accessToken) {
      getAuthClients(
        session?.accessToken as string,
        session?.portal as string
      ).then(setClients);
    }
  }, [session]);

  const [showModal] = useModalWithClient(setClients);
  const [showModalWithLogin] = useModalWithClientLogin();

  const handleEditAuthClient = async (client: ClientApp) => {
    showModal(client);
  };

  const handleToggleAuthClientStatus = async (client: ClientApp) => {
    try {
      await updateAuthClient(session?.accessToken as string, client.client_id, {
        status: Number(!client.status),
      });
      getAuthClients(
        session?.accessToken as string,
        session?.portal as string
      ).then(setClients);
      NotificationManager.success({
        message: (
          <Text fontWeight="semibold">
            {client.client_name} has been updated
          </Text>
        ),
        options: {
          lifetime: 3000,
          isOpen: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAuthClient = async (client: ClientApp) => {
    try {
      await deleteAuthClient(session?.accessToken as string, client.client_id);
      getAuthClients(
        session?.accessToken as string,
        session?.portal as string
      ).then(setClients);
      NotificationManager.success({
        message: (
          <Text fontWeight="semibold">
            {client.client_name} has been deleted
          </Text>
        ),
        options: {
          lifetime: 3000,
          isOpen: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetClientAccessToken = async (client: ClientApp) => {
    try {
      const token = await getClientAccessToken(client);

      NotificationManager.success({
        message: (
          <View>
            <SecretText
              label="Access Token"
              text={token.access_token}
              visible={true}
              ellipsis={false}
            />
          </View>
        ),
        options: {
          lifetime: 30000,
          isOpen: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

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
              Applications
            </Heading>
            <ButtonFilled
              color="complementary"
              icon={IconPlus}
              onClick={() => showModal()}
            >
              New
            </ButtonFilled>
          </View>
          <View flexDirection="column">
            {clients?.map((client, index) => (
              <View
                key={index}
                paddingY={7}
                opacity={client.status ? "none" : "disabled"}
                borderTop={1}
                borderColor="delicate"
              >
                <View
                  flexDirection="row"
                  alignItems="center"
                  marginBottom={3}
                  justifyContent="space-between"
                >
                  <Heading semanticElement="h4" visualHeadingLevel="Heading 4">
                    {client.client_name}
                    {!client.status && (
                      <Pill
                        marginLeft={3}
                        fontSize={1}
                        color="danger"
                        textColor="contrast"
                      >
                        Disabled
                      </Pill>
                    )}
                  </Heading>
                  <StateDropdown
                    items={[
                      {
                        title: "Edit",
                        icon: IconEdit,
                        onClick: () => handleEditAuthClient(client),
                      },
                      {
                        title: client.status ? "Disable" : "Enable",
                        icon: client.status ? IconNotPassed : IconPassed,
                        onClick: () => handleToggleAuthClientStatus(client),
                      },
                      {
                        title: "Delete",
                        icon: IconTrash,
                        color: "danger",
                        onClick: () => handleDeleteAuthClient(client),
                      },
                    ]}
                  />
                </View>
                <SecretText label="Client ID" text={client.client_id} />
                <SecretText label="Client Secret" text={client.client_secret} />
                <SecretText
                  label="Redirect URI"
                  text={client.redirect_uri}
                  visible={true}
                />
                <View flexDirection="row" marginTop={4}>
                  <ButtonMinimal
                    border={1}
                    color="accent"
                    onClick={() => showModalWithLogin(client)}
                  >
                    Test Login
                  </ButtonMinimal>
                  <ButtonMinimal
                    marginLeft={3}
                    border={1}
                    color="accent"
                    onClick={() => handleGetClientAccessToken(client)}
                  >
                    Generate JWT Token
                  </ButtonMinimal>
                </View>
              </View>
            ))}
            {!clients && (
              <View
                alignItems="center"
                justifyContent="center"
                paddingY={9}
                marginX="auto"
              >
                <SpotIcon name="LTI" color="contrast" size={8} />
                <Heading
                  semanticElement="h4"
                  visualHeadingLevel="Heading 4"
                  marginTop={6}
                >
                  You have not created any apps yet
                </Heading>
              </View>
            )}
          </View>
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
