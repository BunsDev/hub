/** @jsxImportSource theme-ui **/
import { useStateValue } from "../state/state";
import Layout from "../components/Layout/Layout";
import { domain } from "../constants";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Themed } from "theme-ui";

const SignIn = (): unknown => {
  const [, dispatch] = useStateValue();
  const router = useRouter();

  useEffect(() => {
    void (async () => {
      if (router.query.code) {
        const response = await axios.get(
          domain + `/api/auth/github/callback/${router.query.code}`,
          {
            withCredentials: true,
          }
        );
        if ("access_token" in response.data) {
          dispatch({
            type: "SET_GITHUB_USER",
            payload: response.data.access_token,
          });
        }
        void router.push(localStorage.getItem("w3hubLastURLb4Signin"));
      }
    })();
  }, [router.query]);
  return (
    <Layout>
      <Flex>
        <main>
          <div className="contents">
            <Themed.h1>Browse APIs</Themed.h1>
            <section
              className="content"
              sx={{ display: "grid", placeItems: "center", height: "50%" }}
            >
              <Themed.h1>Signing In...</Themed.h1>
            </section>
          </div>
        </main>
      </Flex>
    </Layout>
  );
};

export default SignIn;
