/**
 * Version    Date            Author           Remarks
 * 1.00       5 Jan 2020      Carlo Martinez        Initial Commit
 */

/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/runtime', 'N/search', 'N/format', './UtilityLib.js'],

function(NS_Record, NS_Runtime, NS_Search, NS_Format, UtilityLib)
{

    function beforeLoad(scriptContext)
    {
        var stLogTitle = 'beforeLoad';
        var record = scriptContext.newRecord;

        try
        {
            log.debug(stLogTitle, '================= Script Start =================');
            log.debug(stLogTitle, 'NS_Runtime.executionContext = ' + NS_Runtime.executionContext + ' | scriptContext.type = ' + scriptContext.type);

            if( scriptContext.type == 'create')
            {
                var stCreatedFrom = record.getValue({ fieldId: 'createdfrom' });
                if(UtilityLib.isEmpty(stCreatedFrom))
                {
                    return;
                }

                var intItems = record.getLineCount({
                    sublistId: 'item'
                });

                if(intItems > 0)
                {
                    for(var i = 0; i < intItems; i++)
                    {
                        var stItemType = record.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'itemtype',
                            line: i
                        });

                        if(stItemType.toUpperCase() == 'DISCOUNT')
                        {
                            continue;
                        }

                        var flRate = record.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'rate',
                            line: i
                        });
                        record.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_cdn_base_price_so',
                            value: flRate,
                            line: i
                        });
                    }
                }
            }
        }
        catch(error)
        {
            log.error(stLogTitle, 'error.toString = ' + error.toString());
        }
    }

    /**
     * Function definition to be triggered before record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function afterSubmit(scriptContext)
    {
        var stLogTitle = 'afterSubmit';
        var record = scriptContext.newRecord;

        try
        {
            log.debug(stLogTitle, '================= Script Start =================');
            log.debug(stLogTitle, 'NS_Runtime.executionContext = ' + NS_Runtime.executionContext + ' | scriptContext.type = ' + scriptContext.type);

            // if(NS_Runtime.executionContext == NS_Runtime.ContextType.USER_INTERFACE)
            // {
            //     return;
            // }

            var record = NS_Record.load({
                type: scriptContext.newRecord.type,
                id: scriptContext.newRecord.id
            });

            var stJSON = record.getValue({
                fieldId: 'custbody_cdn_discount_json_so'
            });

            var stEndDate = record.getValue({
                fieldId: 'custbody_cdn_discount_exp_date_so'
            });
            var stTranDate = record.getValue({
                fieldId: 'trandate'
            });

            if(UtilityLib.isEmpty(stTranDate))
            {
                stTranDate = NS_Format.format({
                    type: NS_Format.Type.DATE,
                    value: new Date()
                });
            }

            var dtEndDate =  null;
            var dtTranDate = null;

            if(!UtilityLib.isEmpty(stEndDate))
            {
                dtEndDate = NS_Format.parse({
                    type: NS_Format.Type.DATE,
                    value: stEndDate
                });

                dtTranDate = NS_Format.parse({
                    type: NS_Format.Type.DATE,
                    value: stTranDate
                });
            }

            log.debug(stLogTitle, 'dtEndDate = ' + dtEndDate
                            + ' | dtTranDate = ' + dtTranDate);

            var intItems = record.getLineCount({
                sublistId: 'item'
            });

            if(intItems < 1)
            {
                return;
            }

            //Change 12/15/2020
            var stOverrideGroup = record.getValue({
                fieldId: 'custbody_cdn_override_item_group'
            });
            var boolOverrideGroup = record.getValue({
                fieldId: 'custbody_cdn_applyoverrideitemgroup'
            });
            var boolOverridePriceList = record.getValue({
                fieldId: 'custbody_dtz_override_price_list'
            });

            if(boolOverrideGroup == true && !UtilityLib.isEmpty(stOverrideGroup))
            {
                for(var i = 0; i < intItems; i++)
                {
                    var stIG = record.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_cdn_artikelgroep_item_so',
                        line: i
                    });
                    if(stIG == '2' || stIG == '3')
                    {
                        record.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_cdn_artikelgroep_item_so',
                            line: i,
                            value: stOverrideGroup
                        });
                    }
                }
            }

            log.debug(stLogTitle, 'stOverrideGroup = ' + stOverrideGroup
                + ' | boolOverrideGroup = ' + boolOverrideGroup
                + ' | scriptContext.type = ' + scriptContext.type);

            for(var i = 0; i < intItems; i++)
            {
                var stItemType = record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'itemtype',
                    line: i
                });
                var boolManualOverride = record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cdn_disc_calc_performed_so',
                    line: i
                });

                if(stItemType.toUpperCase() == 'DISCOUNT')
                {
                    continue;
                }
                if(boolManualOverride == true || boolManualOverride == 'T')
                {
                    continue;
                }

                var stItemGroup = record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cdn_artikelgroep_item_so',
                    line: i
                });
                var stItem = record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i
                });

                var flDiscountPercent = 0;
                var flDiscount = 0;

                if(!UtilityLib.isEmpty(stJSON))
                {
                    var objJSON = JSON.parse(stJSON);

                    if(!UtilityLib.isEmpty(stEndDate))
                    {
                        if(dtTranDate < dtEndDate)
                        {
                            if(!UtilityLib.isEmpty(objJSON['item'][stItem]))
                            {
                                flDiscountPercent = UtilityLib.forceFloat(objJSON['item'][stItem]);
                                flDiscount = UtilityLib.forceFloat(objJSON['item'][stItem])/100;
                            }
                            else if(!UtilityLib.isEmpty(objJSON['itemgroup'][stItemGroup]))
                            {
                                flDiscountPercent = UtilityLib.forceFloat(objJSON['itemgroup'][stItemGroup]);
                                flDiscount = UtilityLib.forceFloat(objJSON['itemgroup'][stItemGroup])/100;
                            }
                        }
                        else
                        {
                            log.debug(stLogTitle, 'Discount List expired.');
                        }
                    }
                }

                var flOrigRate = UtilityLib.forceFloat(record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: i
                }));
                flOrigRate = UtilityLib.roundDecimalAmount(flOrigRate, 2);

                var flOrigBasePrice = record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cdn_base_price_so',
                    line: i
                });

                if(scriptContext.type == 'create' && UtilityLib.isEmpty(flOrigBasePrice))
                {
                    record.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_cdn_base_price_so',
                        value: flOrigRate,
                        line: i
                    });
                }

                log.debug(stLogTitle, 'A');
                //If Override is TRUE and Override Group has Value And context is EDIT
                if((boolOverrideGroup != true || UtilityLib.isEmpty(stOverrideGroup)) && scriptContext.type == scriptContext.UserEventType.EDIT && boolOverridePriceList != true)
                {
                    continue;
                }
                // else if(scriptContext.type == scriptContext.UserEventType.EDIT && boolOverridePriceList != true)
                // {
                //     continue;
                // }
                else if(scriptContext.type == scriptContext.UserEventType.CREATE || scriptContext.type == scriptContext.UserEventType.COPY )
                {
                    log.debug(stLogTitle, 'continue');
                }

                // if(scriptContext.type != scriptContext.UserEventType.CREATE)
                // {
                //     log.debug(stLogTitle, 'Event type is not CREATE. Will exit.');
                //     continue;
                // }

                var flQuantity = UtilityLib.forceFloat(record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                }));
                var flAmount = record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    line: i
                });
                var flDiscountAmount = flOrigRate * flDiscount * flQuantity;
                var flNetPriceDiscount = flOrigRate * flDiscount;
                flNetPriceDiscount = UtilityLib.roundDecimalAmount(flNetPriceDiscount, 2);
                var flDiscountedNetPrice = flOrigRate - flNetPriceDiscount;

                log.debug(stLogTitle, 'stItemGroup = ' + stItemGroup
                    + ' | flDiscountPercent = ' + flDiscountPercent
                    + ' | flDiscount = ' + flDiscount
                    + ' | flOrigRate = ' + flOrigRate
                    + ' | flDiscountAmount = ' + flDiscountAmount
                    + ' | flDiscountedNetPrice = ' + flDiscountedNetPrice);

                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cdn_orig_gross_amt',
                    value: flOrigRate * flQuantity,
                    line: i
                });
                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_dietz_discount_percentage',
                    value: flDiscountPercent,
                    line: i
                });
                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cdn_disc_amount_so',
                    value: flDiscountAmount,
                    line: i
                });
                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cdn_calc_net_price_so',
                    value: flDiscountedNetPrice,
                    line: i
                });
                // record.setSublistValue({
                //     sublistId: 'item',
                //     fieldId: 'rate',
                //     value: flDiscountedNetPrice,
                //     line: i
                // });
                // record.setSublistValue({
                //     sublistId: 'item',
                //     fieldId: 'amount',
                //     value: flDiscountedNetPrice * flQuantity,
                //     line: i
                // });

                var flDietzDiscount = UtilityLib.forceFloat(record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_dietz_discount_percentage',
                    line: i
                }))/100;
                flDietzDiscount = UtilityLib.roundDecimalAmount(flDietzDiscount, 2);

                var flDietsGrossUnitPrice = UtilityLib.forceFloat(record.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_dietz_gross_price',
                    line: i
                }));
                flDietsGrossUnitPrice = UtilityLib.roundDecimalAmount(flDietsGrossUnitPrice, 2);

                var flDietzGrossTotalPrice = flDietsGrossUnitPrice * flQuantity;

                var flDietzTotalDiscountAmount = flDietzGrossTotalPrice * flDietzDiscount;

                // var flDietzRate = flDietsGrossUnitPrice * flDietzDiscount;

                var flDietzRate = flDietsGrossUnitPrice - ( flDietsGrossUnitPrice * flDietzDiscount);

                if(flDietzDiscount == 0)
                {
                    flDietzRate = flDietsGrossUnitPrice;
                }

                log.debug(stLogTitle, 'flDietzGrossTotalPrice = ' + flDietzGrossTotalPrice
                    + ' | flDietzRate = ' + flDietzRate
                    + ' | flDiscount = ' + flDiscount);

                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_dietz_gross_total_price',
                    value: flDietzGrossTotalPrice,
                    line: i
                });

                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_dietz_total_discount_amt',
                    value: flDietzTotalDiscountAmount,
                    line: i
                });

                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    value: flDietzRate,
                    line: i
                });

                record.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    value: flDietzRate * flQuantity,
                    line: i
                });
            }

            var stUpdated = record.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });
            log.debug(stLogTitle, 'stUpdated = ' + stUpdated);
            log.debug(stLogTitle, '================= Script End ===================');
        }
        catch(error)
        {
            if (error.message != undefined)
            {
                log.error('Process Error', error.name + ' : ' + error.message);
            }
            else
            {
                log.error('Unexpected Error', error.toString());
            }
            // throw error.toString();
        }
    }

    return {
        beforeLoad: beforeLoad,
    	afterSubmit: afterSubmit
    };

});
