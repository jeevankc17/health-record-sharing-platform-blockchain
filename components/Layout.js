import React from "react";
import { Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,} from "semantic-ui-react";
import Head from "next/head";
import MenuBar from "./MenuBar";

export default (props) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        ></link>
      </Head>

      <Segment
        textAlign="center"
        style={{
          minHeight: 150,
          backgroundColor: "white", // Set the background color here
          marginTop: "50px",
          borderRadius: "10px"
        }}
      >
        <MenuBar />
        <Icon size="huge" name="hospital" />
        <Header
          as="h2"
          color="red"
          style={{ fontSize: "2em", fontWeight: "normal" }}
          content="Seamless Appointments, Secure Medical Records"
        />
        <Header
          as="h3"
          style={{ fontSize: "2.5em", fontWeight: "normal", color: "red" }}
          content="Redefining Healthcare Ecosystem..."
        />
      </Segment>

      <Container>{props.children}</Container>

      <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Patient Resources" />
            <List link inverted>
              <List.Item as="a" href="#">
                Medical Records
              </List.Item>
              <List.Item as="a" href="#">
                Appointments
              </List.Item>
              <List.Item as="a" href="#">
                Prescriptions
              </List.Item>
              <List.Item as="a" href="#">
                Health Blog
              </List.Item>
              {/* Add the link below each list item without a specific label */}
              <List.Item as="a" href="#">
                {/* You can leave this empty or add a specific icon or symbol */}
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width={3}>
            <Header inverted as="h4" content="Doctor Services" />
            <List link inverted>
              <List.Item as="a" href="#">
                Appointments
              </List.Item>
              <List.Item as="a" href="#">
                Patient Records
              </List.Item>
              <List.Item as="a" href="#">
                Prescription Management
              </List.Item>
              <List.Item as="a" href="#">
                Health Blog
              </List.Item>
              {/* Add the link below each list item without a specific label */}
              <List.Item as="a" href="#">
                {/* You can leave this empty or add a specific icon or symbol */}
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width={3}>
            <Header inverted as="h4" content="Health Blog" />
            <List link inverted>
              <List.Item as="a" href="#">
                Latest Articles
              </List.Item>
              <List.Item as="a" href="#">
                Health Tips
              </List.Item>
              <List.Item as="a" href="#">
                Medical News
              </List.Item>
              <List.Item as="a" href="#">
                Wellness Advice
              </List.Item>
              {/* Add the link below each list item without a specific label */}
              <List.Item as="a" href="#">
                {/* You can leave this empty or add a specific icon or symbol */}
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width={7}>
            <Header inverted as="h4" content="Get in Touch" />
            <p>
              Connect with us for personalized healthcare services and
              information.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Icon centered size="huge" name="hospital" />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
    </>
  );
};
