'use strict';

import AWS from'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import uuid from'uuid';

export default (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            name: data.name,
            quantity: data.quantity,
            id: uuid.v1(),
            addedAt: Date.now(),
        }
    };
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};