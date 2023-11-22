import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "../routes";
import { Router } from "../routes";
import web3 from "../ethereum/web3";
import {
  Button,
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
  Dropdown,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const HomepageHeading = ({ mobile }) => (
  <Segment
    textAlign="center"
    style={{
      minHeight: mobile ? 200 : 750, // Set different minimum heights for mobile and non-mobile
      background: "white", // Gradient background
    }}
    vertical
  >
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
    ></link>
    <Segment vertical style={{ margin: "6em 0em 0em 0em", padding: "4em 2em" }}>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column floated="right" width={8}>
            <Image
              size="big"
              src="https://res.cloudinary.com/jeevankc17/image/upload/v1699472059/hikqaorwoq1cve2ffpam.png"
              className="ui fluid image animated fadeInRight" // Add animation class to the Image
              centered
            />
          </Grid.Column>
          <Grid.Column
            width={8}
            style={{ margin: "0em 0em 0em", padding: "0em 0.5em" }}
          >
            <Header
              as="h1"
              content={
                <>
                  Decentralized <br />
                  Transparent <br />
                  Tamper-Proof <br />
                  Medical Records Platform
                </>
              }
              
              inverted
              style={{
                fontSize: mobile ? "2em" : "2.5em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: mobile ? "1.5em" : "3em",
                fontFamily: "Georgia",
                color: "#1A8EFD", // Text color
                textAlign: mobile ? "center" : "left",
              }}
            />
            <Header
              as="h2"
              content="Transforming Data into Lifelong Wellness."
              inverted
              style={{
                fontSize: mobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1.5em",
                color: "red", // Text color
                textAlign: "left", // Align text to the left
                textAlign: mobile ? "center" : "left",
              }}
            />
            <Button primary size="huge" inverted>
              <Link route="/dashboard">
                <a className="item">Get Started</a>
              </Link>
              <Icon name="right arrow" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Segment>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
  state = {
    fixed: true, // Set to true by default to always show the menu
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Segment>
          <Menu fixed={fixed ? "top" : null} size="large" inverted>
            <Link route="/">
              <a className="item">Home</a>
            </Link>

            <Menu.Menu position="right">
              <Link route="/dashboard">
                <a className="item">Dashboard</a>
              </Link>

              <Link route="/list">
                <a className="item">Records List</a>
              </Link>

              <Dropdown item text="Doctor">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link route="/">
                      <a
                        style={{ color: "black" }}
                        onClick={this.onClickedDoctor}
                      >
                        View Profile
                      </a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link route="/edit-doctor">
                      <a style={{ color: "black" }}>Edit Profile</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link route="/make-appointment">
                      <a style={{ color: "black" }}>Make Appointment</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link route="/edit-appointment">
                      <a style={{ color: "black" }}>Update Appointment</a>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown item text="Patient">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link route="/">
                      <a
                        style={{ color: "black" }}
                        onClick={this.onClickedPatient}
                      >
                        View Profile
                      </a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link route="/edit-patient">
                      <a style={{ color: "black" }}>Edit Profile</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link route="/approve-doctor">
                      <a style={{ color: "black" }}>Allow Access</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link route="/revoke-doctor">
                      <a style={{ color: "black" }}>Revoke Access</a>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown item text="Register">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link route="/register-patient">
                      <a style={{ color: "black" }}>Patient</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link route="/register-doctor">
                      <a style={{ color: "black" }}>Doctor</a>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
          <HomepageHeading />
        </Segment>
        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Link route="/">
              <a className="item">Home</a>
            </Link>

            <Link route="/dashboard">
              <a className="item">Dashboard</a>
            </Link>

            <Link route="/list">
              <a className="item">Records List</a>
            </Link>

            <Dropdown item text="Doctor">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/">
                    <a
                      style={{ color: "black" }}
                      onClick={this.onClickedDoctor}
                    >
                      View Profile
                    </a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-doctor">
                    <a style={{ color: "black" }}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/make-appointment">
                    <a style={{ color: "black" }}>Make Appointment</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-appointment">
                    <a style={{ color: "black" }}>Update Appointment</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="Patient">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/">
                    <a
                      style={{ color: "black" }}
                      onClick={this.onClickedPatient}
                    >
                      View Profile
                    </a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-patient">
                    <a style={{ color: "black" }}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/approve-doctor">
                    <a style={{ color: "black" }}>Allow Access</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/revoke-doctor">
                    <a style={{ color: "black" }}>Revoke Access</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="Register">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/register-patient">
                    <a style={{ color: "black" }}>Patient</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/register-doctor">
                    <a style={{ color: "black" }}>Doctor</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ padding: "0em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header
              as="h3"
              style={{ fontSize: "2em", color: "#1A8EFD" }}
              className="animated fadeInLeft" // Add animation class to the Header
            >
              On-Demand Healthcare Services At Your Fingertips.
            </Header>
            <p style={{ fontSize: "1.33em" }} className="animated fadeInLeft">
              Your Lifelong Wellness Journey Safeguarded in the Blockchain of
              Care. Unleashing the Power of Transparency, Empowering Your Health
              History in the Digital Age. Where Every Byte Preserves Your
              Well-Being Story, Trusting Tomorrow's Health to Today's Blockchain
              Innovation. Seamlessly Connected, Immutably Secured: Your Health
              Records, Your Control, Our Commitment.
            </p>
            <Header
              as="h3"
              style={{ fontSize: "2em", color: "#1A8EFD" }}
              className="animated fadeInLeft" // Add animation class to the Header
            >
              Unlocking a Digital Epoch of Wellness
            </Header>
            <p style={{ fontSize: "1.33em" }} className="animated fadeInLeft">
              Fortifying Your Well-Being in the Immutable Blocks of Trust. Your
              Health Story, Woven Securely into the Tapestry of Blockchain
              Brilliance. Navigating Tomorrow's Health Landscape with Today's
              Technological Trustworthiness. Seamless, Smart, and Secure –
              Because Your Health Records Deserve the Unrivaled Integrity of
              HealthChain Hub.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              size="big"
              src="https://res.cloudinary.com/jeevankc17/image/upload/v1699472058/xezoewcynoozpactdq1a.png"
              className="ui fluid image animated fadeInRight" // Add animation class to the Image
              centered
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "A Pioneer in Healthcare Innovation – this Blockchain Medical
              Record System sets a new standard."
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <Image
                avatar
                src="https://365psd.com/images/istock/previews/8717/87172655-female-doctor-icon-nurse-symbol-faceless-woman-doctor-with-a-stethoscope.jpg"
              />
              <b>Dr. Sarah Thompson</b>, Chief Medical Officer, Johns Hopkins
              Medicine
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "One of the Best Blockchain Medical Record Systems available."
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <Image
                avatar
                src="https://365psd.com/images/istock/previews/8717/87172655-female-doctor-icon-nurse-symbol-faceless-woman-doctor-with-a-stethoscope.jpg"
              />
              <b>Dr James</b>, Surgeon at Mayo Clinic
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Major Issue with Medical Record Systems
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Hospital emergency department (ED) found that doctors spent 43% of
          their time on data entry. Only 28% of the doctors make direct patient
          contact.
        </p>
        <Link route="/blog">
          <a>
            <Button as="a" size="large">
              Read More
            </Button>
          </a>
        </Link>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a href="#">Case Studies</a>
        </Divider>

        <Header as="h3" style={{ fontSize: "2em" }}>
          Is Blockchain the best step forward for Medical Record Systems?
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Blockchain technology has the potential to enable more secure,
          transparent, and equitable data management. In addition to securely
          managing data, blockchain has significant advantages in distributing
          data access, control, and ownership to end users.
        </p>

        <Link route="/blog">
          <a>
            <Button as="a" size="large">
              Read More
            </Button>
          </a>
        </Link>
      </Container>
    </Segment>

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
  </ResponsiveContainer>
);

export default HomepageLayout;
