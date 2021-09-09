/** @jsxImportSource theme-ui **/
import Layout from "../../../components/Layout";
import BottomSpace from "../../../components/BottomSpace";
import APIDetail from "../../../components/APIDetail";
import { useGetAPIfromENSParamInURL } from "../../../hooks/ens/useGetAPIfromENS";
import Header from "../../../components/Header";

import { Flex } from "theme-ui";

const ApiView = () => {
  const { data, fetchApiDetails } = useGetAPIfromENSParamInURL();
  return (
    <Layout>
      <Header />
      <Flex>
        <main>
          <div className="contents">
            {!!data && <APIDetail api={data} update={fetchApiDetails} />}
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  );
};

export default ApiView;
