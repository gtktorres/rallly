import { withAuthIfRequired, withSessionSsr } from "@rallly/backend/next";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";

import { Button } from "@/components/button";
import { getProfileLayout } from "@/components/layouts/profile-layout";
import { LanguageSelect } from "@/components/poll/language-selector";
import { NextPageWithLayout } from "@/types";
import { useDayjs } from "@/utils/dayjs";
import { withPageTranslations } from "@/utils/with-page-translations";

const Preferences = (props: { className?: string }) => {
  const { t } = useTranslation();

  const { weekStartsOn, setWeekStartsOn, timeFormat, setTimeFormat } =
    useDayjs();
  const router = useRouter();

  return (
    <div className={clsx(props.className, "max-w-md space-y-8")}>
      <div>
        <h2>Preferences</h2>
        <p>Manage your language and region preferences</p>
      </div>
      <div className="space-y-4">
        <h3> {t("common.language")}</h3>
        <div className="mb-2 space-y-2">
          <LanguageSelect className="w-full" onChange={() => router.reload()} />
        </div>
      </div>
      <div className="space-y-4">
        <h3>Date & Time</h3>
        <div className="grow space-y-2">
          <div>
            <div className="mb-2 grow text-sm text-slate-500">
              {t("weekStartsOn")}
            </div>
            <div>
              <div className="segment-button">
                <button
                  className={clsx({
                    "segment-button-active": weekStartsOn === "monday",
                  })}
                  onClick={() => {
                    setWeekStartsOn("monday");
                  }}
                  type="button"
                >
                  {t("monday")}
                </button>
                <button
                  className={clsx({
                    "segment-button-active": weekStartsOn === "sunday",
                  })}
                  onClick={() => {
                    setWeekStartsOn("sunday");
                  }}
                  type="button"
                >
                  {t("sunday")}
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-2 grow text-sm text-slate-500">
              {t("timeFormat")}
            </div>
            <div className="segment-button">
              <button
                className={clsx({
                  "segment-button-active": timeFormat === "12h",
                })}
                onClick={() => {
                  setTimeFormat("12h");
                }}
                type="button"
              >
                {t("12h")}
              </button>
              <button
                className={clsx({
                  "segment-button-active": timeFormat === "24h",
                })}
                onClick={() => {
                  setTimeFormat("24h");
                }}
                type="button"
              >
                {t("24h")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button type="primary">{t("save")}</Button>
      </div>
    </div>
  );
};

const Page: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t("preferences")}</title>
      </Head>
      <Preferences />
    </div>
  );
};

Page.getLayout = getProfileLayout;

export const getServerSideProps = withSessionSsr([
  withAuthIfRequired,
  withPageTranslations(),
]);

export default Page;
