/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

/*
ID :
Name :
Purpose :
Created On :
Author : Lea Columna
Script Type : Suitelet
Saved Searches : NONE
*/


define(['N/record', 'N/search','N/ui/serverWidget','N/file','N/render','N/https'],
    function(record,search,ui,file,render, https) {
        function onRequest(context) {
            try {
                if (context.request.method === 'GET') {
                    if(typeof context.request.parameters.invoiceId != 'undefined') {
                        var intInvoiceId = context.request.parameters.invoiceId;
                        var objInvoice = getInvoice(intInvoiceId);

                        if(objInvoice.statusref == 'open') {
                            var productId = createStripeProduct(context, objInvoice);
                            if(productId != "") {
                                var priceId = createStripeProductPrice(context, objInvoice, productId);
                                var xmlTemplateFile = file.load({ id : '../Library/bp_payment.html' });
                                var htmlContent = xmlTemplateFile.getContents();
                                htmlContent = htmlContent.replace('stPriceId', JSON.stringify(priceId));
                                context.response.write(htmlContent);
                            }

                        } else if(objInvoice.statusref == 'paidInFull') {
                            /** ALREADY BEEN PAID **/
                            errorpage(context,"Invoice already been paid. Please contact administrator for assistance.");
                        } else {
                            /** VOIDED **/
                            errorpage(context,"Invoice Voided. Cannot Process Payment. Please contact administrator for assistance.");
                        }

                    } else {
                        errorpage(context,"Lacking invoiceId Parameter. Please contact administrator for assistance.");
                    }
                } else {
                    log.debug('context.request.parameters', context.request.parameters);
                }

            } catch(e) { log.debug("ERROR", e); }
        }

        function getInvoice(intInvoiceId) {
            var objData = {};
            var invoiceSearchObj = search.create({
                type: "invoice",
                filters: [
                    ["type","anyof","CustInvc"], "AND",
                    ["internalid","anyof", intInvoiceId], "AND",
                    ["mainline","is","T"]
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
                invoiceSearchObj.run().each(function(result){
                    objData = {
                        "recordid": result.id,
                        "tranid" : result.getValue('tranid'),
                        "currency" : result.getText('currency').toLowerCase(),
                        "exchangerate" : result.getValue('exchangerate'),
                        "total" : parseFloat(result.getValue('total')).toFixed(2).toString().replace('.',''),
                        "statusref" : result.getValue('statusref'),
                        "custbody_stripe_id" : result.getValue('custbody_stripe_id'),
                        "custbody_stripe_price_id" : result.getValue('custbody_stripe_price_id')
                    };
                    return false;
                });
            }
            return objData;
        }

        function createStripeProduct(context, objInvoiceData) {
            var intProductId = objInvoiceData.custbody_stripe_id;

            if(objInvoiceData.custbody_stripe_id == "") {
                var headers = getHeaders();
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                var endpoint = "https://api.stripe.com/v1/products";
                var encodedValue = encodeURIComponent(objInvoiceData.tranid);
                var objProduct = JSON.parse(https.post({
                    url: endpoint,
                    headers: headers,
                    body: "name="+encodedValue
                }).body);

                if(typeof objProduct.id != 'undefined') {
                    /** MAP STRIPE PRODUCT ID TO INVOICE **/
                    record.submitFields({
                        type:'invoice',
                        id: objInvoiceData.recordid,
                        values: { custbody_stripe_id: objProduct.id }
                    });

                    intProductId = objProduct.id;

                } else { errorpage(context, objProduct.error.message); }

            }

            return intProductId;
        }

        function createStripeProductPrice(context, objInvoiceData, productId) {
            var intProductPriceId = objInvoiceData.custbody_stripe_price_id;

            if(objInvoiceData.custbody_stripe_price_id == "") {
                /** CREATE NEW PRICE **/
                var headers = getHeaders();
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                var endpoint = "https://api.stripe.com/v1/prices";
                var encodedProduct = encodeURIComponent(productId);
                var encodedAmount = encodeURIComponent(objInvoiceData.total);
                var encodedCurrency = encodeURIComponent(objInvoiceData.currency);

                var stData = "product="+encodedProduct+"&unit_amount="+encodedAmount+"&currency="+encodedCurrency
                var objProductPrice = JSON.parse(https.post({
                    url: endpoint,
                    headers: headers,
                    body: stData
                }).body);

                if(typeof objProductPrice.id != 'undefined') {
                    /** MAP STRIPE PRODUCT ID TO INVOICE **/
                    record.submitFields({
                        type:'invoice',
                        id: objInvoiceData.recordid,
                        values: { custbody_stripe_price_id: objProductPrice.id }
                    });

                    intProductPriceId = objProductPrice.id;

                } else { errorpage(context, objProductPrice.error.message); }
            }

            return intProductPriceId;
        }

        function errorpage(context, stErrorMessage) {
            var xmlTemplateFile = file.load({ id : '../Library/bp_errorpage.html' });
            var htmlContent = xmlTemplateFile.getContents();
            htmlContent = htmlContent.replace('ErrorMessage', stErrorMessage);
            context.response.write(htmlContent);
        }

        function successpage(context) {
            var xmlTemplateFile = file.load({ id : '../Library/bp_successpage.html' });
            var htmlContent = xmlTemplateFile.getContents();
            context.response.write(htmlContent);
        }

        function getHeaders() {
            var headers = {};
            headers['Content-Type'] = 'application/json';
            headers['Accept'] = 'application/json';
            headers['access-control-allow-credentials'] = true;
            headers['Authorization'] = "Bearer sk_test_WH5GgotRcbZRsGfwrsxHsG1r";
            return headers;
        }
        return { onRequest: onRequest };
    });