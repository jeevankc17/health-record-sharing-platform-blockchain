import React, { Component } from "react";
import {
  Segment,
  Input,
  Header,
  Message,
  Button,
  Form,
  Icon,
  Checkbox,
  Card,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import Swal from "sweetalert2";
import { Link } from "../routes";

class RevokeDoctor extends Component {
  state = {
    doctorAddr: "",
    loadingRevoke: false,
    loadingShowHide: false,
    errorMessage: "",
    showAddress: false,
    search: "",
    showFullAddresses: false,
  };

  static async getInitialProps() {
    const allRecords = await record.methods.getDoctors().call();
    return { allRecords };
  }

  // Helper function to format Ethereum addresses
  formatAddress(address) {
    const start = address.slice(0, 5);
    const end = address.slice(-5);
    const middle = "**********"; // You can customize the number of asterisks based on your preference
    return `${start}${middle}${end}`;
  }

  toggleAddressVisibility = () => {
    this.setState(
      (prevState) => ({
        showAddress: !prevState.showAddress,
        loadingShowHide: true, // Set loading state for "Show/Hide" button
      }),
      () => {
        // Callback to reset loading state after animation (adjust the timeout as needed)
        setTimeout(() => {
          this.setState({ loadingShowHide: false });
        }, 300);
      }
    );
  };

  toggleShowAddresses = () => {
    this.setState((prevState) => ({
      showFullAddresses: !prevState.showFullAddresses,
    }));
  };

  onSearch = async (event) => {
    event.preventDefault();

    // Get the search input value
    const searchTerm = this.state.search;

    // Check if the search term is a valid Ethereum address
    const isValidAddress = web3.utils.isAddress(searchTerm);

    // Filter the patient addresses based on the search term (if it's a valid address)
    const filteredRecords = isValidAddress
      ? this.props.allRecords.filter((address) => address.includes(searchTerm))
      : [];

    // Update the component state with the filtered records
    this.setState({
      filteredRecords,
    });
  };

  renderRecords() {
    const { showFullAddresses, filteredRecords } = this.state;

    // Use filteredRecords if available, otherwise use allRecords
    const recordsToDisplay = filteredRecords || this.props.allRecords;

    if (recordsToDisplay.length === 0) {
      return <p>No records found.</p>;
    }

    const items = recordsToDisplay.map((address) => {
      const formattedAddress = this.formatAddress(address);

      return {
        header: showFullAddresses ? address : formattedAddress,
        description: (
          <Link route={`/record/${address}`}>
            <a>View Record</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  onRevoke = async () => {
    this.setState({ loading: true, errorMessage: "" });

    try {
      const { doctorAddr } = this.state;

      // Validate the Ethereum address
      if (!web3.utils.isAddress(doctorAddr)) {
        throw new Error("Invalid Ethereum address");
      }

      const accounts = await web3.eth.getAccounts();

      // Update the state with the new revoked doctor
      await record.methods
        .givePermission(doctorAddr)
        .send({ from: accounts[0] });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Permission Granted",
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const { showAddress, loadingRevoke, loadingShowHide } = this.state;

    return (
      <Layout>
        <Grid centered>
          <GridColumn
            mobile={16}
            tablet={8}
            computer={6}
            style={{ marginTop: "20px" }}
          >
            <Segment style={{ maxWidth: "400px" }}>
              <Header
                as="h2"
                textAlign="center"
                content="Revoke Access"
                subheader="Give doctor or patient permission to view records"
              />
              <Form error={!!this.state.errorMessage}>
                <Form.Field>
                  <Input
                    fluid
                    placeholder="Doctor's Ethereum Address"
                    type={showAddress ? "text" : "password"}
                    iconPosition="left"
                    icon="address card outline"
                    value={this.state.doctorAddr}
                    onChange={(event) =>
                      this.setState({ doctorAddr: event.target.value })
                    }
                  />
                </Form.Field>
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />
                <Button
                  primary
                  fluid
                  loading={loadingShowHide}
                  onClick={this.toggleAddressVisibility}
                  icon
                  labelPosition="right"
                >
                  {showAddress ? "Hide" : "Show"}
                  <Icon name={showAddress ? "eye slash" : "eye"} />
                </Button>
                <Button
                  primary
                  fluid
                  loading={loadingRevoke}
                  style={{ marginTop: "10px" }}
                  onClick={this.onRevoke}
                >
                  Revoke
                </Button>
              </Form>
            </Segment>
          </GridColumn>

          <GridColumn
            mobile={16}
            tablet={8}
            computer={10}
            style={{ marginTop: "20px" }}
          >
            <Form onSubmit={this.onSearch}>
              <Form.Field>
                <Input
                  fluid
                  action={{ icon: "search" }}
                  placeholder="Search..."
                  onChange={(event) =>
                    this.setState({ search: event.target.value })
                  }
                />
                <br />
              </Form.Field>
              <Form.Field>
                <label>Show Addresses:</label>
                <Checkbox
                  toggle
                  checked={this.state.showFullAddresses}
                  onChange={this.toggleShowAddresses}
                />
              </Form.Field>
            </Form>
            <Header as="h2">Doctor's Medical Records List</Header>
            {this.renderRecords()}
          </GridColumn>
        </Grid>
      </Layout>
    );
  }
}

export default RevokeDoctor;
