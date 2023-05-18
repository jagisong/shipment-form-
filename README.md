# Shipment-Management-Form
This is a form designed to help manage shipments. It stores ship data in a database called JPDB. When a user enters a shipment number, the form automatically verifies it and retrieves ship details from the JPDB API. The form utilizes AJAX, a special technique, to ensure fast and seamless interaction with the application. It supports the storage of various types of data such as numbers, strings, and dates. Overall, the form provides a user-friendly solution for effectively managing shipments.

## Benefits of using JsonPowerDB
- The form can store different types of data, including structured, semi-structured, and unstructured data, as well as files and big data.
- It allows for dynamic relational constraints, meaning you can manage relational data without pre-defining specific elements like primary keys, foreign keys, or unique keys.
- The form is technology-agnostic, making it compatible with various technologies through HTTP Rest APIs.
- It has a low learning curve, so developers can quickly understand and use it.
- The form enables faster application development, reducing time to market and development costs.
- It provides developers with tools and techniques to effectively manage their databases and work with their data efficiently.

## Release History

### JsonPowerDB
**Version:** 2.0

#### Execute API

```
var baseUrl = "http://api.login2explore.com:5577";
function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
```

#### Create a PUT Request String

```
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}
```

## Features
- Simple to Use
- Fast Response
- Detailed User Interface

## Tech Stack

**Client:** HTML,CSS,Javascript

**Server:** JsonPowerDB

## Screenshots

- Form without any data entry. All buttons are disabled.

![Screenshot 2023-05-18 161811](https://github.com/jagisong/Shipment-Management-Form/assets/124791409/a4ba5700-409d-4831-8d4f-5018858bc761)


- Form with a new data entry. Save and Reset buttons are enabled.

![Screenshot 2023-05-18 162044](https://github.com/jagisong/Shipment-Management-Form/assets/124791409/d38862f1-0bf6-4f89-9be1-4907afdb9ca6)


- Form with a existing data entry. Update and Reset buttons are enabled.

![Screenshot 2023-05-18 162154](https://github.com/jagisong/Shipment-Management-Form/assets/124791409/5b906775-d012-4bb1-a10d-74dfcd1859c1)
