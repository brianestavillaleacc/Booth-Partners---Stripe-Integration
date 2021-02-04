/**
 *
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope Public
 */

/*
ID                :
Name                : Create Stripe Transaction
Purpose             : This script is used for the creation of the trust receipt record
Created On          :
Author              :
Script Type         : User Event
Saved Searches      : NONE
*/

var contextRecord;
define(['N/record','N/search','N/ui/serverWidget'],
    function(record,search,serverWidget) {

        function beforeLoad(context) {
            var form = context.form;
            var actionField = form.getField({ id : 'custpage_wrm_action' });
            actionField.isMandatory = false;
            actionField.updateDisplayType({ displayType : serverWidget.FieldDisplayType.HIDDEN });
        }

        return { beforeLoad: beforeLoad };

    });


{
    "object": "list",
    "data": [
    {
        "id": "pi_1IGJNnHPvjuiMXdQjKNkpOyk",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 27500,
        "amount_capturable": 0,
        "amount_received": 27500,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [
                {
                    "id": "ch_1IGLNHHPvjuiMXdQWa2R12AE",
                    "object": "charge",
                    "amount": 27500,
                    "amount_captured": 27500,
                    "amount_refunded": 0,
                    "application": null,
                    "application_fee": null,
                    "application_fee_amount": null,
                    "balance_transaction": "txn_1IGLNHHPvjuiMXdQ5xVEKDeO",
                    "billing_details": {
                        "address": {
                            "city": null,
                            "country": "PH",
                            "line1": null,
                            "line2": null,
                            "postal_code": null,
                            "state": null
                        },
                        "email": "brianestavilla@gmail.com",
                        "name": "Brian Estavilla",
                        "phone": null
                    },
                    "calculated_statement_descriptor": "BOOTH AND PARTNERS",
                    "captured": true,
                    "created": 1612258843,
                    "currency": "usd",
                    "customer": "cus_Is5YT2Kuw1Td15",
                    "description": "1x INV-00133 1x Test",
                    "destination": null,
                    "dispute": null,
                    "disputed": false,
                    "failure_code": null,
                    "failure_message": null,
                    "fraud_details": {},
                    "invoice": null,
                    "livemode": false,
                    "metadata": {},
                    "on_behalf_of": null,
                    "order": null,
                    "outcome": {
                        "network_status": "approved_by_network",
                        "reason": null,
                        "risk_level": "normal",
                        "risk_score": 39,
                        "seller_message": "Payment complete.",
                        "type": "authorized"
                    },
                    "paid": true,
                    "payment_intent": "pi_1IGJNnHPvjuiMXdQjKNkpOyk",
                    "payment_method": "pm_1IGLNGHPvjuiMXdQ3CbX0EH3",
                    "payment_method_details": {
                        "card": {
                            "brand": "visa",
                            "checks": {
                                "address_line1_check": null,
                                "address_postal_code_check": null,
                                "cvc_check": "pass"
                            },
                            "country": "US",
                            "exp_month": 4,
                            "exp_year": 2024,
                            "fingerprint": "opeoaEDX5CZpY533",
                            "funding": "credit",
                            "installments": null,
                            "last4": "4242",
                            "network": "visa",
                            "three_d_secure": null,
                            "wallet": null
                        },
                        "type": "card"
                    },
                    "receipt_email": "brianestavilla@gmail.com",
                    "receipt_number": null,
                    "receipt_url": "https://pay.stripe.com/receipts/acct_1DbkEQHPvjuiMXdQ/ch_1IGLNHHPvjuiMXdQWa2R12AE/rcpt_Is5YSCXmpLTfY6EJgB7zjxIJlYfhDM6",
                    "refunded": false,
                    "refunds": {
                        "object": "list",
                        "data": [],
                        "has_more": false,
                        "total_count": 0,
                        "url": "/v1/charges/ch_1IGLNHHPvjuiMXdQWa2R12AE/refunds"
                    },
                    "review": null,
                    "shipping": null,
                    "source": null,
                    "source_transfer": null,
                    "statement_descriptor": null,
                    "statement_descriptor_suffix": null,
                    "status": "succeeded",
                    "transfer_data": null,
                    "transfer_group": null
                }
            ],
            "has_more": false,
            "total_count": 1,
            "url": "/v1/charges?payment_intent=pi_1IGJNnHPvjuiMXdQjKNkpOyk"
        },
        "client_secret": "pi_1IGJNnHPvjuiMXdQjKNkpOyk_secret_Lf1uwRVF3Wt3pmKESeHkZx5tN",
        "confirmation_method": "automatic",
        "created": 1612251187,
        "currency": "usd",
        "customer": "cus_Is5YT2Kuw1Td15",
        "description": "1x INV-00133 1x Test",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": "pm_1IGLNGHPvjuiMXdQ3CbX0EH3",
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": "brianestavilla@gmail.com",
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "succeeded",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGJHsHPvjuiMXdQ63UcPAet",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 15000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGJHsHPvjuiMXdQ63UcPAet"
        },
        "client_secret": "pi_1IGJHsHPvjuiMXdQ63UcPAet_secret_jg6DXNIQiffMQfH4bt3PWYmmF",
        "confirmation_method": "automatic",
        "created": 1612250820,
        "currency": "usd",
        "customer": null,
        "description": "1x INV-00133",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGJ4qHPvjuiMXdQYGnET9nM",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 15000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGJ4qHPvjuiMXdQYGnET9nM"
        },
        "client_secret": "pi_1IGJ4qHPvjuiMXdQYGnET9nM_secret_o8oeQmqQYnOfRYOM3hic167NP",
        "confirmation_method": "automatic",
        "created": 1612250012,
        "currency": "usd",
        "customer": null,
        "description": "1x INV-00133",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGIUvHPvjuiMXdQHopHSzl9",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 10000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGIUvHPvjuiMXdQHopHSzl9"
        },
        "client_secret": "pi_1IGIUvHPvjuiMXdQHopHSzl9_secret_KLp6NiCat28AjmQQJdgCzMJQ7",
        "confirmation_method": "automatic",
        "created": 1612247785,
        "currency": "usd",
        "customer": "cus_IrcnZXyk59XHfI",
        "description": "Invoice 5DDC5E58-0008",
        "invoice": "in_1IGISIHPvjuiMXdQg6fwlPkn",
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": "src_1IFxC6HPvjuiMXdQiz11O8yi",
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_confirmation",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGHu5HPvjuiMXdQYnYA3qLk",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 15000,
        "amount_capturable": 0,
        "amount_received": 15000,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [
                {
                    "id": "ch_1IGHubHPvjuiMXdQovUn08cu",
                    "object": "charge",
                    "amount": 15000,
                    "amount_captured": 15000,
                    "amount_refunded": 0,
                    "application": null,
                    "application_fee": null,
                    "application_fee_amount": null,
                    "balance_transaction": "txn_1IGHubHPvjuiMXdQ1Z1f715N",
                    "billing_details": {
                        "address": {
                            "city": null,
                            "country": "PH",
                            "line1": null,
                            "line2": null,
                            "postal_code": null,
                            "state": null
                        },
                        "email": "brianestavilla@gmail.com",
                        "name": "Brian Estavilla",
                        "phone": null
                    },
                    "calculated_statement_descriptor": "BOOTH AND PARTNERS",
                    "captured": true,
                    "created": 1612245533,
                    "currency": "usd",
                    "customer": "cus_Is1yCjp2dBYBSN",
                    "description": "1x INV-0012",
                    "destination": null,
                    "dispute": null,
                    "disputed": false,
                    "failure_code": null,
                    "failure_message": null,
                    "fraud_details": {},
                    "invoice": null,
                    "livemode": false,
                    "metadata": {},
                    "on_behalf_of": null,
                    "order": null,
                    "outcome": {
                        "network_status": "approved_by_network",
                        "reason": null,
                        "risk_level": "normal",
                        "risk_score": 50,
                        "seller_message": "Payment complete.",
                        "type": "authorized"
                    },
                    "paid": true,
                    "payment_intent": "pi_1IGHu5HPvjuiMXdQYnYA3qLk",
                    "payment_method": "pm_1IGHuZHPvjuiMXdQW027uv8f",
                    "payment_method_details": {
                        "card": {
                            "brand": "visa",
                            "checks": {
                                "address_line1_check": null,
                                "address_postal_code_check": null,
                                "cvc_check": "pass"
                            },
                            "country": "US",
                            "exp_month": 4,
                            "exp_year": 2024,
                            "fingerprint": "opeoaEDX5CZpY533",
                            "funding": "credit",
                            "installments": null,
                            "last4": "4242",
                            "network": "visa",
                            "three_d_secure": null,
                            "wallet": null
                        },
                        "type": "card"
                    },
                    "receipt_email": "brianestavilla@gmail.com",
                    "receipt_number": null,
                    "receipt_url": "https://pay.stripe.com/receipts/acct_1DbkEQHPvjuiMXdQ/ch_1IGHubHPvjuiMXdQovUn08cu/rcpt_Is1yaFlfOnq2240ko9LYlPqFZhYa9XF",
                    "refunded": false,
                    "refunds": {
                        "object": "list",
                        "data": [],
                        "has_more": false,
                        "total_count": 0,
                        "url": "/v1/charges/ch_1IGHubHPvjuiMXdQovUn08cu/refunds"
                    },
                    "review": null,
                    "shipping": null,
                    "source": null,
                    "source_transfer": null,
                    "statement_descriptor": null,
                    "statement_descriptor_suffix": null,
                    "status": "succeeded",
                    "transfer_data": null,
                    "transfer_group": null
                }
            ],
            "has_more": false,
            "total_count": 1,
            "url": "/v1/charges?payment_intent=pi_1IGHu5HPvjuiMXdQYnYA3qLk"
        },
        "client_secret": "pi_1IGHu5HPvjuiMXdQYnYA3qLk_secret_JtFlZ4CbrisN6RqsPrZy7QOsP",
        "confirmation_method": "automatic",
        "created": 1612245501,
        "currency": "usd",
        "customer": "cus_Is1yCjp2dBYBSN",
        "description": "1x INV-0012",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": "pm_1IGHuZHPvjuiMXdQW027uv8f",
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": "brianestavilla@gmail.com",
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "succeeded",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGGOcHPvjuiMXdQuiwtwAyP",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 1000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGGOcHPvjuiMXdQuiwtwAyP"
        },
        "client_secret": "pi_1IGGOcHPvjuiMXdQuiwtwAyP_secret_9j2ByafTfE0CaNIMLikr7XlZD",
        "confirmation_method": "automatic",
        "created": 1612239706,
        "currency": "usd",
        "customer": null,
        "description": "Created by stripe.com/docs demo",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGGObHPvjuiMXdQRr57gNOd",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 1000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGGObHPvjuiMXdQRr57gNOd"
        },
        "client_secret": "pi_1IGGObHPvjuiMXdQRr57gNOd_secret_YyVa7UPwMahGbWW2yLqWZvHJE",
        "confirmation_method": "automatic",
        "created": 1612239705,
        "currency": "usd",
        "customer": null,
        "description": "Created by stripe.com/docs demo",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGGObHPvjuiMXdQEJW1Fyox",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 1000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGGObHPvjuiMXdQEJW1Fyox"
        },
        "client_secret": "pi_1IGGObHPvjuiMXdQEJW1Fyox_secret_PJZsuGMbCex6bUkkKAIOoRDdw",
        "confirmation_method": "automatic",
        "created": 1612239705,
        "currency": "usd",
        "customer": null,
        "description": "Created by stripe.com/docs demo",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGGK9HPvjuiMXdQasEcMNmH",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 1000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGGK9HPvjuiMXdQasEcMNmH"
        },
        "client_secret": "pi_1IGGK9HPvjuiMXdQasEcMNmH_secret_Iy7W1636qbCCOjXdF5UmbQv2T",
        "confirmation_method": "automatic",
        "created": 1612239429,
        "currency": "usd",
        "customer": null,
        "description": "Created by stripe.com/docs demo",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    },
    {
        "id": "pi_1IGGJxHPvjuiMXdQjJ0Brk36",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 1000,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_1IGGJxHPvjuiMXdQjJ0Brk36"
        },
        "client_secret": "pi_1IGGJxHPvjuiMXdQjJ0Brk36_secret_yszJtythlaYzwFB8PZ0wb6z0i",
        "confirmation_method": "automatic",
        "created": 1612239417,
        "currency": "usd",
        "customer": null,
        "description": "Created by stripe.com/docs demo",
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {},
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    }
],
    "has_more": true,
    "url": "/v1/payment_intents"
}b