import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import * as React from "react";

import Adjustments from "@/components/icons/adjustments.svg";
import ChevronRight from "@/components/icons/chevron-right.svg";
import Login from "@/components/icons/login.svg";
import Logout from "@/components/icons/logout.svg";
import Question from "@/components/icons/question-mark-circle.svg";
import Refresh from "@/components/icons/refresh.svg";
import User from "@/components/icons/user.svg";
import UserCircle from "@/components/icons/user-circle.svg";
import Logo from "~/public/logo.svg";

import { DayjsProvider } from "../utils/dayjs";
import Dropdown, { DropdownItem, DropdownProps } from "./dropdown";
import Cash from "./icons/cash.svg";
import Discord from "./icons/discord.svg";
import Github from "./icons/github.svg";
import Twitter from "./icons/twitter.svg";
import ModalProvider, { useModalContext } from "./modal/modal-provider";
import Popover from "./popover";
import Preferences from "./preferences";
import { IfAuthenticated, IfGuest, useUser } from "./user-provider";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-6 pt-3 pb-6 text-slate-400 lg:h-16 lg:flex-row lg:space-y-0 lg:space-x-6 lg:py-0 lg:px-8 lg:pb-3">
      <div>
        <Link href="https://rallly.co">
          <a className="text-sm text-slate-400 transition-colors hover:text-primary-500 hover:no-underline">
            <Logo className="h-5" />
          </a>
        </Link>
      </div>
      <div className="hidden text-slate-300 lg:block">&bull;</div>
      <div className="flex items-center justify-center space-x-6 md:justify-start">
        <a
          target="_blank"
          href="https://support.rallly.co"
          className="text-sm text-slate-400 transition-colors hover:text-primary-500 hover:no-underline"
          rel="noreferrer"
        >
          {t("common:support")}
        </a>
        <Link href="https://github.com/lukevella/rallly/discussions">
          <a className="text-sm text-slate-400 transition-colors hover:text-primary-500 hover:no-underline">
            {t("common:discussions")}
          </a>
        </Link>
        <Link href="https://blog.rallly.co">
          <a className="text-sm text-slate-400 transition-colors hover:text-primary-500 hover:no-underline">
            {t("common:blog")}
          </a>
        </Link>
        <div className="hidden text-slate-300 lg:block">&bull;</div>
        <div className="flex items-center space-x-6">
          <a
            href="https://twitter.com/ralllyco"
            className="text-sm text-slate-400 transition-colors hover:text-primary-500 hover:no-underline"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/lukevella/rallly"
            className="text-sm text-slate-400 transition-colors hover:text-primary-500 hover:no-underline"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://discord.gg/uzg4ZcHbuM"
            className="text-sm text-slate-400 transition-colors hover:text-primary-500 hover:no-underline"
          >
            <Discord className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="hidden text-slate-300 lg:block">&bull;</div>
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=7QXP2CUBLY88E"
        className="inline-flex h-8 items-center rounded-full bg-slate-100 pl-2 pr-3 text-sm text-slate-400 transition-colors hover:bg-primary-500 hover:text-white hover:no-underline focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 active:bg-primary-600"
      >
        <Cash className="mr-1 inline-block w-5" />
        <span>{t("app:donate")}</span>
      </a>
    </div>
  );
};

const UserDropdown: React.VoidFunctionComponent<DropdownProps> = ({
  children,
  ...forwardProps
}) => {
  const { user, reset } = useUser();
  const { t } = useTranslation(["common", "app"]);
  const modalContext = useModalContext();
  if (!user) {
    return null;
  }
  return (
    <Dropdown {...forwardProps}>
      {children}
      <IfAuthenticated>
        <DropdownItem href="/profile" icon={User} label={t("app:profile")} />
        <DropdownItem
          href="/logout"
          onClick={async (e) => {
            e.preventDefault();
            await reset();
          }}
          icon={Logout}
          label={t("app:logout")}
        />
      </IfAuthenticated>
      <IfGuest>
        <DropdownItem
          icon={Question}
          label={t("app:whatsThis")}
          onClick={() => {
            modalContext.render({
              showClose: true,
              content: (
                <div className="w-96 max-w-full p-6 pt-28">
                  <div className="absolute left-0 -top-8 w-full text-center">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-gradient-to-b from-purple-400 to-primary-500">
                      <User className="h-7 text-white" />
                    </div>
                    <div className="">
                      <div className="text-lg font-medium leading-snug">
                        {t("app:guest")}
                      </div>
                      <div className="text-sm text-slate-500">{user.id}</div>
                    </div>
                  </div>
                  <p>{t("app:guestSessionNotice")}</p>
                  <div>
                    <a
                      href="https://support.rallly.co/guest-sessions"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("app:guestSessionReadMore")}
                    </a>
                  </div>
                </div>
              ),
              overlayClosable: true,
              footer: null,
            });
          }}
        />
        <DropdownItem
          icon={Refresh}
          label={t("app:forgetMe")}
          onClick={() => {
            modalContext.render({
              title: t("app:areYouSure"),
              description: t("app:endingGuestSessionNotice"),
              onOk: async () => {
                await reset();
              },
              okButtonProps: {
                type: "danger",
              },
              okText: t("app:endSession"),
              cancelText: t("app:cancel"),
            });
          }}
        />
      </IfGuest>
    </Dropdown>
  );
};

export const AppLayout: React.VFC<{
  children?: React.ReactNode;
  title: string;
  breadcrumbs?: Array<{ title: React.ReactNode; href: string }>;
}> = ({ title, breadcrumbs, children }) => {
  const { t } = useTranslation("app");
  const { user } = useUser();
  const getName = () => {
    if (!user.isGuest) {
      return user.name;
    }

    const [, id] = user.id.split("-");

    return `${t("guest")}-${id.substring(0, 4)}`;
  };
  return (
    <DayjsProvider>
      <ModalProvider>
        <div className="flex min-h-[calc(100vh-64px)] min-w-fit">
          <div className="grow overflow-y-scroll">
            <div className="px-6 pb-6">
              <Head>
                <title>{title}</title>
              </Head>
              <div className="mb-4 flex h-16 w-full items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link href="/polls">
                    <a>
                      <Logo className="h-6 text-primary-500" />
                    </a>
                  </Link>
                  <div className="flex items-center space-x-1 rounded-lg bg-slate-500/10 py-1 px-3">
                    {breadcrumbs?.map((breadcrumb, i) => (
                      <span key={i}>
                        <Link href={breadcrumb.href}>
                          <a className="mr-1 h-9 py-1 text-gray-500 hover:text-gray-600">
                            {breadcrumb.title}
                          </a>
                        </Link>
                        <span className="text-gray-400">
                          <ChevronRight className="inline-block h-5" />
                        </span>
                      </span>
                    ))}
                    <span className="font-medium">{title}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Popover
                    placement="bottom-end"
                    trigger={
                      <button
                        type="button"
                        className="flex items-center whitespace-nowrap rounded-md px-2 py-1 font-medium text-slate-600 transition-colors hover:bg-gray-200 hover:text-slate-600 hover:no-underline active:bg-gray-300"
                      >
                        <Adjustments className="h-5 opacity-75" />
                        <span className="ml-2 hidden sm:block">
                          {t("preferences")}
                        </span>
                      </button>
                    }
                  >
                    <Preferences />
                  </Popover>
                  <IfGuest>
                    <Link href="/login">
                      <a className="flex w-full items-center space-x-2 whitespace-nowrap rounded-md px-2 py-1 font-medium text-slate-600 transition-colors hover:bg-gray-200 hover:text-slate-600 hover:no-underline active:bg-gray-300">
                        <Login className="h-5 opacity-75" />
                        <span className="inline-block">{t("login")}</span>
                      </a>
                    </Link>
                  </IfGuest>
                  <UserDropdown
                    key={user.id} // make sure dropdown closes when user changes. There are nicer ways to do this.
                    placement="bottom-end"
                    trigger={
                      <button
                        type="button"
                        className="flex items-center whitespace-nowrap rounded-md px-2 py-1 font-medium text-slate-600 transition-colors hover:bg-gray-200 hover:text-slate-600 hover:no-underline active:bg-gray-300"
                      >
                        <UserCircle className="h-5 opacity-75" />
                        <span className="ml-2 hidden sm:block">
                          {getName()}
                        </span>
                      </button>
                    }
                  ></UserDropdown>
                </div>
              </div>
              <div className="mx-auto max-w-4xl">{children}</div>
            </div>
          </div>
        </div>
        <Footer />
      </ModalProvider>
    </DayjsProvider>
  );
};
