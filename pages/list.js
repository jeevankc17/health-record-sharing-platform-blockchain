import React, { Component } from 'react';
import { Card, Input, Form, Checkbox } from 'semantic-ui-react';
import { Link } from '../routes';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RecordsList extends Component {
    state = {
        search: '',
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
        const middle = '**********'; // You can customize the number of asterisks based on your preference
        return `${start}${middle}${end}`;
    }

    toggleShowAddresses = () => {
        this.setState((prevState) => ({
            showFullAddresses: !prevState.showFullAddresses,
        }));
    };

    onSearch = async (event) => {
        event.preventDefault();
        Router.pushRoute(`/record/${this.state.search}`);
    };

    renderRecords() {
        const { showFullAddresses } = this.state;

        const items = this.props.allRecords.map((address) => {
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
                                action={{ icon: 'search' }}
                                placeholder="Search..."
                                onChange={(event) => this.setState({ search: event.target.value })}
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
