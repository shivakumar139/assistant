import { useParams } from "react-router-dom";
import { Page, FormLayout, TextField, AlphaCard, Button, Spinner, Form, Toast, Frame, Box, Layout, LegacyCard, Text, Stack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";


export default function UserEdit() {

  const fetch = useAuthenticatedFetch()
  const [toastActive, setToastActive] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [formData, setFormData] = useState({
    id:"",
    firstName: "",
    lastName: "",
    email: ""
  });
  const { id } = useParams();

  

  const {data, isLoading} = useAppQuery({
    url: `/api/customer/${id}`
  })


  useEffect(()=>{
    if(!isLoading){
        setFormData({
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email
        })
      }
  },[isLoading])


  
  



  const handleChange = useCallback((name, value)=>{
        setFormData({
            ...formData,
            [name]: value
        })
  },[formData])


    const handleSubmit = async () => {
        setButtonLoading(true)
        try{
            const response = await fetch("/api/customer/update", {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            });
            if(response.ok){
                setToastActive(true)
            }

        } catch(err){
            console.log("err -> ", err)
        }
        
        setButtonLoading(false)

        


    }


  


  return (
    <Frame>
    <Page 
    title={`${formData.firstName} ${formData.lastName}`}
    compactTitle
    pagination={{
        hasPrevious: true,
      }}
      breadcrumbs={[{ content: "Edit User", url: "/" }]}
    >
        {toastActive?<Toast content="User Updated" onDismiss={()=>setToastActive(false)}/>:null}
      {/* <TitleBar
        primaryAction={null}
      /> */}
      

        {isLoading ? <Spinner size="large"/>:

    <Layout>

        <Layout.Section>
            <AlphaCard>
                <Stack distribution="fill">
                    <Box padding="2">
                        <Text color="subdued">Amount spent</Text>
                        <Text variant="heading3xl" as="h2" fontWeight="semibold">
                        ₹{data.total_spent}
                        </Text>
                    </Box>
                    <Box borderInlineStart="divider" padding="2">
                    <Text color="subdued">Orders</Text>
                        <Text variant="heading3xl" as="h2" fontWeight="semibold">
                            {data.orders_count}
                        </Text>
                    </Box>
                </Stack>
                
                
            </AlphaCard>
            

        </Layout.Section>

        <Layout.Section>
            <AlphaCard>
                <Form onSubmit={handleSubmit}>
                    <FormLayout>
                    <TextField label="First Name" value={formData.firstName} onChange={(value)=> {handleChange("firstName", value)}} autoComplete="off" />

                    <TextField label="Last Name" value={formData.lastName} onChange={(value)=> {handleChange("lastName", value)}} autoComplete="off" />

                    <TextField
                        type="email"
                        label="Email"
                        onChange={(value)=> {handleChange("email", value)}}
                        autoComplete="email"
                        value={formData.email}
                    />
                    <Button submit loading={buttonLoading} primary>Update</Button>
                </FormLayout>

                </Form>
            </AlphaCard>

        </Layout.Section>
    </Layout>
        }
        
    
    </Page>
    </Frame>
  );
}