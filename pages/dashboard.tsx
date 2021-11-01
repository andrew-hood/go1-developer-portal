import Image from 'next/image';
import { View, Heading, ButtonFilled, Container, ButtonMinimal, Text, SpotIcon, NotificationManager, Pill } from '@go1d/go1d'
import { useEffect, useState } from 'react'
import { getAuthClients, updateAuthClient, ClientApp, deleteAuthClient, getClientAccessToken } from '../services/authService';
import Layout from '../components/common/layout';
import { useSession } from 'next-auth/react';
import SecretText from '../components/common/SecretText';
import IconExternallink from '@go1d/go1d/build/components/Icons/Externallink';
import useModalWithClient from '../components/common/hooks';
import StateDropdown from '../components/common/dropdown';
import IconEdit from '@go1d/go1d/build/components/Icons/Edit';
import IconNotPassed from '@go1d/go1d/build/components/Icons/NotPassed';
import IconPassed from '@go1d/go1d/build/components/Icons/Passed';
import IconTrash from '@go1d/go1d/build/components/Icons/Trash';

import GET_STARTED_IMAGE from '../public/get-started.png';

export default function Dashboard() {
  const { data: session } = useSession();
  const [clients, setClients] = useState<ClientApp[]>(null);

  useEffect(() => {
    if (session?.accessToken) {
      getAuthClients(session?.accessToken as string).then(setClients);
    }
  }, [session])

  const [showModal] = useModalWithClient(setClients);

  const handleEditAuthClient = async (client: ClientApp) => {
    showModal(client);
  } 

  const handleToggleAuthClientStatus = async (client: ClientApp) => {
    try {
      await updateAuthClient(session?.accessToken as string, client.client_id, { status: Number(!client.status) });
      getAuthClients(session?.accessToken as string).then(setClients);
      NotificationManager.success({
        message: (
          <Text fontWeight="semibold">{client.client_name} has been updated</Text>
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
      getAuthClients(session?.accessToken as string).then(setClients);
      NotificationManager.success({
        message: (
          <Text fontWeight="semibold">{client.client_name} has been deleted</Text>
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
            <SecretText label="Access Token" text={token.access_token} visible={true} ellipsis={false} />
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
  }

  return (
    <Layout title="Client Apps">
      
      <Container
        contain="wide"
        flexDirection={['column', 'row']}
        paddingY={7}
        paddingX={[6, 0]}
        alignItems="center"
        justifyContent="space-between"
      >
        <View flexBasis={0.5} alignItems={['center', 'flex-start']}>
          <Heading fontFamily="mono" semanticElement="h2" visualHeadingLevel="Heading 2" marginBottom={4}>Get started</Heading>
          <Text fontFamily="mono">Create a new client credentials or review the official Go1 developer documentation</Text>
          <View flexDirection="row" marginTop={8}>
            <ButtonFilled color="complementary" onClick={() => showModal()}>Create App</ButtonFilled>
            <ButtonMinimal
              border={2}
              marginLeft={3}
              icon={IconExternallink}
              color="contrast"
              target="_blank"
              href="https://developers.go1.com/"
            >
              Documentation
            </ButtonMinimal>
          </View>
        </View>
        <View>
          <Image src={GET_STARTED_IMAGE} placeholder="blur" width={350} height={350} />
        </View>
      </Container>

      <View backgroundColor="faint">
        <Container
          contain="wide"
          paddingY={8}
          paddingX={[6, 0]}
        >
          <View flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {clients?.map((client, index) => (
              <View key={index} flexBasis={[1, 0.48]} border={2} borderColor="contrast" borderRadius={4} padding={5} marginBottom={7} opacity={client.status ? 'none' : 'disabled'}>
                <View flexDirection="row" alignItems="center" marginBottom={4} justifyContent="space-between">
                  <Heading fontFamily="mono" semanticElement="h3" visualHeadingLevel="Heading 3">
                    {client.client_name}
                    { !client.status && <Pill marginLeft={3} fontSize={1} color="danger" textColor="contrast">Disabled</Pill> }
                  </Heading>
                  <StateDropdown
                    items={[
                      {
                        title: 'Edit',
                        icon: IconEdit,
                        onClick: () => handleEditAuthClient(client)
                      },
                      {
                        title: client.status ? 'Disable' : 'Enable',
                        icon: client.status ? IconNotPassed : IconPassed,
                        onClick: () => handleToggleAuthClientStatus(client)
                      },
                      {
                        title: 'Delete',
                        icon: IconTrash,
                        color: 'danger',
                        onClick: () => handleDeleteAuthClient(client)
                      }
                    ]}
                  />
                </View>
                <SecretText label="Client ID" text={client.client_id} />
                <SecretText label="Client Secret" text={client.client_secret} />
                <SecretText label="Redirect URI" text={client.redirect_uri} visible={true} />
                <View flexDirection="row" marginTop={4}>
                  <ButtonMinimal
                    border={1}
                    color="complementary"
                    target="_blank"
                    href={`https://auth.go1.com/oauth/authorize?response_type=token&client_id=${client.client_id}&redirect_uri=${client.redirect_uri}&scope=user.read&partner_portal_id=1866971`}
                  >
                    Test Login
                  </ButtonMinimal>
                  <ButtonMinimal
                    marginLeft={3}
                    border={1}
                    color="contrast"
                    onClick={() => handleGetClientAccessToken(client)}
                  >
                    Generate JWT Token
                  </ButtonMinimal>
                  
                </View>
              </View>
            ))}
            {!clients && (
              <View alignItems="center" justifyContent="center" paddingY={9} marginX="auto">
                <SpotIcon name="LTI" color="contrast" size={8} />
                <Heading fontFamily="mono" semanticElement="h4" visualHeadingLevel="Heading 4" marginTop={6}>You have not created any apps yet</Heading>
              </View>
            )}
          </View>
        </Container>
      </View>

    </Layout>
  )
}
