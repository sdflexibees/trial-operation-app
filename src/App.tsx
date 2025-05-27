import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator, Button, Card, Collection, Flex, Heading, Label, Link, Tabs, withAuthenticator } from "@aws-amplify/ui-react";
import LaunchJobCreateForm from "./ui-components/LaunchJobCreateForm";
import LaunchJobUpdateForm from "./ui-components/LaunchJobUpdateForm";


const client = generateClient<Schema>();


function App() {
  const [LaunchJob, setLaunchs] = useState<Array<Schema["LaunchJob"]["type"]>>([]);

  useEffect(() => {
    client.models.LaunchJob.observeQuery().subscribe({
      next: (data) => setLaunchs([...data.items]),
    });
  }, []);
  const fetchLaunchJob = async () => {
    const { data: items } = await client.models.LaunchJob.list();
    setLaunchs(items);
  };
  useEffect(() => {
    fetchLaunchJob();
  }, []);
  function updateLaunch(id: any) {
    return <>
      <Heading level={5}> Fill the form based on your feedback from the interview. </Heading>
      <Flex id="Update"  >
        <LaunchJobUpdateForm launchJob={LaunchJob.find((launch) => launch.id === id)} />
      </Flex>
    </>
  }
  function getLaunches() {
    return <>
      <Flex id="Launches"  >
        
        <Collection type="grid" items={LaunchJob} direction="row" justifyContent= "space-between" 
        wrap = "wrap" isPaginated isSearchable  itemsPerPage={15}>
          {(item, index) =>
            <Card key={index} backgroundColor={"inherit"} border={"brown"}>
              Notes: <Label children={item.notes} /> , <br></br>
              Date of Launch: <Label children={item.launch_date} /> , <br></br>
              Period: <Label children={item.contract_duration} /> , <br></br>
              Client Pricing: <Label children={item.client_pricing} /> , <br></br>
              Candidate Pricing: <Label children={item.candidate_pricing} /> , <br></br>
              Status: <Label children={item.status} /> , <br></br>
              Comment: <Label children={item.notes} /> <br></br>
              <p />
              <Button onClick={() => updateLaunch(item.id)}>Update</Button>
            </Card>
          }
        </Collection>
      </Flex>
    </>
  }
  function getForm() {
    return <>
      <Flex id="LaunchForm"  >
        <LaunchJobCreateForm />
      </Flex>
    </>
  }
  return (

    <Authenticator>

      {({ signOut }) => (
        <main>

          <Heading level={1} children="Launches" alignSelf={"center"}></Heading>

          <Link children="Signout" onClick={signOut} alignSelf={"end"} />
          <Tabs defaultValue="launchForm" justifyContent={"center"} padding={"large"}
            items={[
              { label: 'Launch', value: 'launch', content: (getLaunches()) },
              { label: 'LaunchForm', value: 'launchForm', content: (getForm()) },
            ]}
            isLazy
          />
          </main>
  )
}
      </Authenticator >
    

  );
}

export default withAuthenticator(App);
