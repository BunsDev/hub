/** @jsxImportSource theme-ui **/
import { domain } from "../../constants";

import { Flex, Themed } from "theme-ui";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Layout, ContentNav } from "components";
import { useAuth, useStateValue } from "hooks";

const UserApis = () => {
  const router = useRouter();
  const [{ dapp }] = useStateValue();
  const [activeTab, setActiveTab] = useState<string | string[]>();
  const { authenticate } = useAuth(dapp);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    void router.push(router.pathname + "?activeTab=" + tab);
  };

  useEffect(() => {
    if (!dapp.did) {
      void authenticate();
    }
  }, [dapp.did]);

  useEffect(() => {
    if (router.query.activeTab && !activeTab) {
      setActiveTab(router.query.activeTab);
    }
  }, [router.query.activeTab, activeTab]);

  useEffect(() => {
    if (router.isReady && !router.query.activeTab) {
      void router.push(router.pathname + "?activeTab=published");
    }
  }, [router.isReady, router.query?.activeTab, router.pathname]);

  const { data: favoriteData } = useSWR(
    domain + "/api/apis/favorites/user/" + dapp.did,
    {
      isPaused: () => !dapp.did,
    }
  );

  const { data: publishedData } = useSWR(domain + "/api/users/" + dapp.did, {
    isPaused: () => !dapp.did,
  });

  return (
    <Layout>
      <Flex>
        <main>
          <div className="contents">
            <Themed.h1>My API&apos;s</Themed.h1>
            <section className="content">
              <ContentNav
                setActiveTab={handleTabClick}
                activeTab={activeTab as string}
                tabs={[
                  {
                    label: "Published",
                    count: publishedData?.apis?.length || 0,
                    data: publishedData?.apis || 0,
                  },
                  {
                    label: "Favorites",
                    count: favoriteData?.count || 0,
                    data: favoriteData?.data || [],
                  },
                ]}
              />
              <br />
              {/*               {activeTab === "published" && (
                <Published apis={publishedData?.apis || []} />
              )}
              {activeTab === "favorites" && (
                <Favorites apis={favoriteData?.data || []} />
              )} */}
            </section>
          </div>
        </main>
      </Flex>
    </Layout>
  );
};

export default UserApis;
