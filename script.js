var connToken = "90933169|-31949319652461198|90951022";
var dbName = "DELIVERY-DB";
var relName = "SHIPMENT-TABLE";
var dbBaseUrl = "http://api.login2explore.com:5577";
var api_Iml = "/api/iml";
var api_Irl = "/api/irl";

$("#shipmentNo").focus();

function saveRecordNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recordNo2LS", lvData.rec_no);
    // console.log(lvData.rec_no);
}

function getShipNoAsJsonObj() {
    var shipNo = $("#shipmentNo").val();
    var jsonStr = {
        shipment_No: shipNo
    };

    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecordNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    // console.log(record);
    $("#description").val(record.description);
    $("#source").val(record.source);
    $("#destination").val(record.destination);
    $("#shippingDate").val(record.shipping_date);
    $("#deliveryDate").val(record.Expected_Delivery_Date);
}


function getShip() {
    var shipNoJsonObj = getShipNoAsJsonObj();
    var getByKeyRequest = createGET_BY_KEYRequest(connToken, dbName, relName, shipNoJsonObj, true, true)
    // console.log(getByKeyRequest);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getByKeyRequest, dbBaseUrl, api_Irl);
    jQuery.ajaxSetup({ async: true });
    // console.log(resJsonObj);

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#description").focus();
    } else if (resJsonObj.status === 200) {
        fillData(resJsonObj);
        $("shipmentNo").prop("disabled", true);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("description").focus();
    }
}

function validateData() {
    var shipNo, desc, sour, dest, delivery, shipping;
    shipNo = $("#shipmentNo").val();
    desc = $("#description").val();
    sour = $("#source").val();
    dest = $("#destination").val();
    shipping = $("#shippingDate").val();
    delivery = $("#deliveryDate").val();

    if (shipNo === "") {
        alert("Shipment-No missing");
        $("#shipmentNo").focus();
        return "";
    }

    if (desc === "") {
        alert("Description missing");
        $("#description").focus();
        return "";
    }

    if (sour === "") {
        alert("Source missing");
        $("#source").focus();
        return "";
    }

    if (dest === "") {
        alert("Destination missing");
        $("#destination").focus();
        return "";
    }

    if (shipping === "") {
        alert("Shipping-Date missing");
        $("#shippingDate").focus();
        return "";
    }

    if (delivery === "") {
        alert("Expected-Delivery-Date missing");
        $("#deliveryDate").focus();
        return "";
    }

    var jsonStrObj = {
        shipment_No: shipNo,
        description: desc,
        source: sour,
        destination: dest,
        shipping_date: shipping,
        Expected_Delivery_Date: delivery
    };

    return JSON.stringify(jsonStrObj);
}

function resetData() {
    $("#shipmentNo").val('');
    $("#description").val('');
    $("#source").val('');
    $("#destination").val('');
    $("#shippingDate").val('');
    $("#deliveryDate").val('');
    $("#shipmentNo").prop('disabled', false);
    $("#save").prop('disabled', true);
    $("#update").prop('disabled', true);
    $("#reset").prop("disabled", true);
    $("#shipmentNo").focus();
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") return "";
    var putRequest = createPUTRequest(connToken, jsonStrObj, dbName, relName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, dbBaseUrl, api_Iml);
    jQuery.ajaxSetup({ async: true });
    resetData();
    $("#shipmentNo").focus();
}

function updateData() {
    $("#update").prop("disabled", true);
    jsonChng = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChng, dbName, relName, localStorage.getItem('recordNo2LS'));
    // console.log(updateRequest);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, dbBaseUrl, api_Iml);
    jQuery.ajaxSetup({ async: true });
    resetData();
    $("#shipmentNo").focus();
}


