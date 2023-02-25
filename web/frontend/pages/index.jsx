import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  Card,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";
import { UserTable } from "./user/UserTable";
export default function HomePage() {
  /*
    Add an App Bridge useNavigate hook to set up the navigate function.
    This function modifies the top-level browser URL so that you can
    navigate within the embedded app and keep the browser in sync on reload.
  */
  const navigate = useNavigate();

  /*
    These are mock values. Setting these values lets you preview the loading markup and the empty state.
  */
  const isLoading = false;
  const isRefetching = false;
  const QRCodes = [];

  /* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
  const loadingMarkup = isLoading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;





  return (
    <Page >
      <TitleBar
        title="Customer Info"
        
      />
      <Layout>
        <Layout.Section>
          {loadingMarkup}
          <UserTable/>

        </Layout.Section>
      </Layout>
    </Page>
  );
}
