/** @jsxImportSource theme-ui **/
import { Layout, APIDetail } from "components";
import { useGetAPIfromENSParamInURL } from "hooks";
import { APIData } from "hooks/ens/useGetAPIfromENS";

const ApiView = () => {
  const { data, fetchApiDetails } = useGetAPIfromENSParamInURL();
  return (
    <Layout>
      {!!data && <APIDetail api={data as APIData} update={fetchApiDetails} />}
    </Layout>
  );
};

export default ApiView;
