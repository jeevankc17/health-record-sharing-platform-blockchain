import React, { Component } from "react";
import { Card, Input, Form, Checkbox } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class RecordsList extends Component {
  state = {
    search: "",
    showFullAddresses: false,
  };

  static async getInitialProps() {
    const allRecords = await record.methods.getPatients().call();
    return { allRecords };
  }

  // Helper function to format Ethereum addresses
  formatAddress(address) {
    const start = address.slice(0, 5);
    const end = address.slice(-5);
    const middle = "**********"; // You can customize the number of asterisks based on your preference
    return `${start}${middle}${end}`;
  }

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

  render() {
    return (
      <Layout>
        <div>
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
          <h2>Patient's Medical Records List</h2>
          {this.renderRecords()}
        </div>
      </Layout>
    );
  }
}

export default RecordsList;
