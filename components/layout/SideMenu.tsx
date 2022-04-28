import { View, Heading, foundations } from "@go1d/go1d";
import { FC } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import IconGrid from "@go1d/go1d/build/components/Icons/Grid";
import IconReport from "@go1d/go1d/build/components/Icons/Report";
import IconTrash from "@go1d/go1d/build/components/Icons/Trash";
import IconClock from "@go1d/go1d/build/components/Icons/Clock";
import IconDocument from "@go1d/go1d/build/components/Icons/Document";
import IconAssignment from "@go1d/go1d/build/components/Icons/Assignment";
import IconUser from "@go1d/go1d/build/components/Icons/User";
import IconSettings from "@go1d/go1d/build/components/Icons/Settings";
import IconLogout from "@go1d/go1d/build/components/Icons/Logout";

const WIDTH = 280;

interface ItemType {
  label: string;
  href: string;
  subitems?: any[];
  tags?: string[];
}

interface Props {
  menu?: {
    label: string;
    href: string;
    subitems?: any[];
    tags?: string[];
  }[];
}

const MENU = [
  {
    label: "Applications",
    href: "/dashboard",
    icon: <IconGrid marginRight={4} color="inherit" />,
    subitems: [
      {
        label: "Recent",
        href: "/applications",
        icon: <IconClock marginRight={4} color="inherit" />,
      },
      {
        label: "Archived",
        href: "/analytics",
        icon: <IconTrash marginRight={4} color="inherit" />,
      },
    ],
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <IconReport marginRight={4} color="inherit" />,
  },
  {
    label: "Documentation",
    href: "/documentation",
    icon: <IconDocument marginRight={4} color="inherit" />,
    subitems: [
      {
        label: "Test Suite",
        href: "/applications",
        icon: <IconAssignment marginRight={4} color="inherit" />,
      },
    ],
  },
  {
    label: "Account",
    href: "/account",
    icon: <IconUser marginRight={4} color="inherit" />,
    subitems: [
      {
        label: "Settings",
        href: "/applications",
        icon: <IconSettings marginRight={4} color="inherit" />,
      },
      {
        label: "Logout",
        onClick: signOut,
        icon: <IconLogout marginRight={4} color="inherit" />,
      },
    ],
  },
];

const SideMenu: FC<Props> = ({ menu }) => {
  return (
    <View width={WIDTH} display={["none", "none", "flex"]}>
      <View
        width={WIDTH}
        height="100vh"
        backgroundColor="faint"
        position="fixed"
        borderRight={1}
        borderColor="soft"
      >
        <View
          flexGrow={1}
          flexShrink={1}
          overflow="auto"
          paddingX={6}
          paddingBottom={4}
        >
          {MENU.map((item) => (
            <View
              key={item.label}
              paddingY={5}
              borderBottom={1}
              borderColor="delicate"
            >
              <View
                paddingY={3}
                flexDirection="row"
                alignItems="center"
                css={{
                  top: 0,
                }}
              >
                <Heading
                  semanticElement="h5"
                  visualHeadingLevel="Heading 5"
                  color="default"
                  ellipsis={true}
                  css={{
                    "& > div:hover": {
                      cursor: "pointer",
                      color: foundations.colors.contrast,
                    },
                  }}
                >
                  <Link href={item.href} passHref>
                    <View flexDirection="row" alignItems="center">
                      {item.icon}
                      {item.label}
                    </View>
                  </Link>
                </Heading>
              </View>
              {item.subitems?.map((subitem, index) => (
                <Heading
                  key={index}
                  semanticElement="h6"
                  visualHeadingLevel="Heading 6"
                  color="subtle"
                  paddingY={3}
                  ellipsis={true}
                  css={{
                    "& > div:hover": {
                      cursor: "pointer",
                      color: foundations.colors.contrast,
                    },
                  }}
                  onClick={subitem.onClick}
                >
                  <Link href={subitem?.href || "#"} passHref>
                    <View flexDirection="row" alignItems="center">
                      {subitem.icon}
                      {subitem.label}
                    </View>
                  </Link>
                </Heading>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SideMenu;
