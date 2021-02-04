/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/record', 'N/search'],
/**
 * @param{https} https
 * @param{record} record
 * @param{search} search
 */
function(https, record, search) {
   
    /**
     * Marks the beginning of the Map/Reduce process and generates input data.
     *
     * @typedef {Object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     *
     * @return {Array|Object|Search|RecordRef} inputSummary
     * @since 2015.1
     */
    function getInputData() {
        var objPayments = getPayments();

        // log.debug('objPayments', objPayments);

        return objPayments.data;
    }

    /**
     * Executes when the map entry point is triggered and applies to each key/value pair.
     *
     * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
     * @since 2015.1
     */
    function map(context) {
        var objData = JSON.parse(context.value);

        if(objData.status == 'succeeded') {
            var stTranId = objData.description.replace('1x ','');
            var objInvoice = getInvoiceId(stTranId);
            if(objInvoice.statusref == "open") {
                log.debug('CUSTOMER_PAYMENT_ID', createPayment(objInvoice.recordid, objData.id));
            }

        }
    }

    /**
     * Executes when the reduce entry point is triggered and applies to each group.
     *
     * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
     * @since 2015.1
     */
    function reduce(context) {

    }


    /**
     * Executes when the summarize entry point is triggered and applies to the result set.
     *
     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
     * @since 2015.1
     */
    function summarize(summary) {

    }

    /** FUNCTIONS **/
    function getInvoiceId(stTranId) {
        var objData = {};
        var invoiceSearchObj = search.create({
            type: "invoice",
            filters: [
                ["type","anyof","CustInvc"], "AND",
                ["mainline","is","T"],"AND",
                ["numbertext","haskeywords",stTranId]
            ],
            columns: [
                search.createColumn({name: "tranid", label: "Document Number"}),
                search.createColumn({name: "currency", label: "Currency"}),
                search.createColumn({name: "exchangerate", label: "Exchange Rate"}),
                search.createColumn({name: "total", label: "Amount (Transaction Total)"}),
                search.createColumn({name: "statusref", label: "Status"}),
                search.createColumn({name: "custbody_stripe_id", label: "Stripe Invoice ID"}),
                search.createColumn({name: "custbody_stripe_price_id", label: "Stripe Price ID"})
            ],
            settings: [
                search.createSetting({ name: 'consolidationtype', value: 'NONE' })
            ]
        });
        var searchResultCount = invoiceSearchObj.runPaged().count;
        if(searchResultCount != 0) {
            invoiceSearchObj.run().each(function(result) {
                objData = {
                    "recordid": result.id,
                    "tranid" : result.getValue('tranid'),
                    "currency" : result.getText('currency').toLowerCase(),
                    "exchangerate" : result.getValue('exchangerate'),
                    "total" : result.getValue('total'),
                    "statusref" : result.getValue('statusref'),
                    "custbody_stripe_id" : result.getValue('custbody_stripe_id'),
                    "custbody_stripe_price_id" : result.getValue('custbody_stripe_price_id')

                };
                return false;
            });
        }
        return objData;
    }

    function createPayment(intInvoiceId, stStripePaymentId) {
        var objRecord = record.transform({
            fromType: record.Type.INVOICE,
            fromId: intInvoiceId,
            toType: record.Type.CUSTOMER_PAYMENT,
            isDynamic: true,
        });

        objRecord.setValue('custbody_stripe_payment_id', stStripePaymentId);

        return objRecord.save();
    }

    function getPayments() {
        var headers = getHeaders();
        var endpoint = "https://api.stripe.com/v1/payment_intents?limit=10";
        var returnMessage = https.get({
            url: endpoint,
            headers: headers
        });
        return JSON.parse(returnMessage.body);
    }

    function getHeaders() {
        var headers = {};
        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
        headers['access-control-allow-credentials'] = true;
        headers['Authorization'] = "Bearer sk_test_WH5GgotRcbZRsGfwrsxHsG1r";
        return headers;
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
    
});