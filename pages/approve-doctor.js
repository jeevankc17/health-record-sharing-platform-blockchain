import React, { Component } from 'react';
import { Segment, Input, Header, Message, Button, Form, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import Swal from 'sweetalert2';


class ApproveDoctor extends Component {
    state = {
        doctorAddr: '',
        loading: false,
        errorMessage: '',
        showAddress: false
    };

    toggleAddressVisibility = () => {
        this.setState((prevState) => ({
            showAddress: !prevState.showAddress
        }));
    };

    onApprove = async () => {
        this.setState({ loading: true, errorMessage: '' });

        try {
            const { doctorAddr } = this.state;

            // Validate the Ethereum address
            if (!web3.utils.isAddress(doctorAddr)) {
                throw new Error('Invalid Ethereum address');
            }

            const accounts = await web3.eth.getAccounts();

            // Update the state with the new approved doctor
            await record.methods.givePermission(doctorAddr).send({ from: accounts[0] });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Permission Granted',
              })
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        const { showAddress } = this.state;

        return (
            <Layout>
                <Segment style={{ maxWidth: '500px', margin: 'auto' }}>
                    <Header
                        as='h2'
                        content='Allow Access'
                        subheader='Give doctor or patient permission to view records'
                    />
                    <Form error={!!this.state.errorMessage}>
                        <Form.Field>
                            <Input
                                fluid
                                placeholder="Doctor's Ethereum Address"
                                type={showAddress ? 'text' : 'password'}
                                iconPosition='left'
                                icon='address card outline'
                                value={this.state.doctorAddr}
                                onChange={(event) => this.setState({ doctorAddr: event.target.value })}
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button
                            primary
                            fluid
                            loading={this.state.loading}
                            onClick={this.toggleAddressVisibility}
                            icon
                            labelPosition='right'
                        >
                            {showAddress ? 'Hide' : 'Show'}
                            <Icon name={showAddress ? 'eye slash' : 'eye'} />
                        </Button>
                        <Button
                            primary
                            fluid
                            loading={this.state.loading}
                            style={{ marginTop: '10px' }}
                            onClick={this.onApprove}
                        >
                            Approve
                        </Button>
                    </Form>
                </Segment>
            </Layout>
        );
    }
}

export default ApproveDoctor;