import Link from "next/link";
import {
  ButtonFilled,
  ButtonMinimal,
  Container,
  foundations,
  Heading,
  Text,
  View,
} from "@go1d/go1d";
import IconGo1Logo from "@go1d/go1d/build/components/Icons/Go1Logo";
import IconLogout from "@go1d/go1d/build/components/Icons/Logout";
import { useSession, signOut } from "next-auth/react";
import useWindowPosition from "../../hooks/useWindowPosition";
import { useRef, useState } from "react";

const MENU_ITEMS = [
  {
    label: "Features",
    items: [{ label: "Manage Applications" }, { label: "" }],
  },
  {
    label: "Docs & Resources",
    items: [
      { label: "API Reference" },
      { label: "Authentication" },
      { label: "Testing Studio" },
    ],
  },
  {
    label: "Solutions",
    items: [{ label: "Flutter Example" }, { label: "Tutorial" }],
  },
];

const Header = () => {
  let timer = useRef(null);
  const scrollPosition = useWindowPosition();
  const [menu, setMenu] = useState(null);
  const { data: session } = useSession();

  const handleShowMenu = (_menu) => {
    clearTimeout(timer.current);
    _menu?.label !== menu?.label && setMenu(_menu);
  };
  const handleHideMenu = () => {
    timer.current = setTimeout(() => {
      setMenu(null);
    }, 100);
  };

  return (
    <View
      color="background"
      paddingY={3}
      zIndex={10}
      position="fixed"
      width="100%"
      css={{
        transition: foundations.transitions.subtle,
        ...(scrollPosition > 20 && {
          backgroundColor: foundations.colors.background,
          color: foundations.colors.accent,
          boxShadow: foundations.shadows.distant,
        }),
      }}
    >
      <Container
        contain="wide"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Link href="/">
          <View
            flexDirection="row"
            alignItems="center"
            css={{ cursor: "pointer" }}
          >
            <IconGo1Logo
              size={7}
              color={scrollPosition > 20 ? "accent" : "complementary"}
            />
            <Text
              fontSize={2}
              fontWeight="medium"
              marginBottom={2}
              marginLeft={3}
              transition="none"
            >
              Developer Studio
            </Text>
          </View>
        </Link>
        <View
          flexDirection="row"
          display={["none", "flex"]}
          alignItems="center"
        >
          {MENU_ITEMS.map((item, index) => (
            <Text
              key={index}
              fontWeight="medium"
              transition="none"
              onMouseOver={() => handleShowMenu(item)}
              onMouseOut={() => handleHideMenu()}
              marginX={4}
              css={{
                cursor: "pointer",
                ...(menu?.label === item.label
                  ? {
                      borderBottom: "1px solid",
                    }
                  : {
                      borderBottom: "1px solid transparent",
                    }),
              }}
            >
              {item.label}
            </Text>
          ))}

          {/* <ButtonMinimal
            color="inherit"
            transition="none"
            onMouseOver={() => handleShowMenu("Docs &amp; Resources")}
            onMouseOut={() => handleHideMenu()}
          >
            Docs &amp; Resources
          </ButtonMinimal>
          <Link href="/#resources">
            <ButtonMinimal
              color="inherit"
              transition="none"
              onMouseOver={() => handleShowMenu("Solutions")}
              onMouseOut={() => handleHideMenu()}
            >
              Solutions
            </ButtonMinimal>
          </Link> */}
        </View>
        {!session ? (
          <View flexDirection="row">
            <Link href="/login">
              <ButtonMinimal color="inherit" transition="none">
                Login
              </ButtonMinimal>
            </Link>
            <Link href="/#register">
              <ButtonFilled color="complementary" marginLeft={4}>
                Get Started
              </ButtonFilled>
            </Link>
          </View>
        ) : (
          <ButtonFilled
            color="complementary"
            icon={IconLogout}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </ButtonFilled>
        )}

        {!!menu && (
          <View
            position="absolute"
            width="100%"
            css={{
              top: 60,
            }}
          >
            <View
              flexDirection="row"
              width={800}
              height={200}
              marginX="auto"
              backgroundColor="background"
              overflow="hidden"
              borderRadius={3}
              boxShadow="distant"
              zIndex={100}
              onMouseOver={() => handleShowMenu(menu)}
              onMouseOut={() => handleHideMenu()}
            >
              <View flexBasis={0.4} padding={5}>
                <Heading
                  semanticElement="h5"
                  visualHeadingLevel="Heading 5"
                  color="contrast"
                >
                  {menu.label}
                </Heading>
                {menu?.items.map((item) => (
                  <Text color="default">{item.label}</Text>
                ))}
              </View>
              <View flexBasis={0.6} backgroundColor="faint" padding={5}></View>
            </View>
          </View>
        )}
      </Container>
    </View>
  );
};

export default Header;
