
	const uuidv1 = require('uuid/v1');
	const axios = require('axios').default;
	var AWS = require('aws-sdk');
	var ses = new AWS.SES({apiVersion: '2010-12-01'});
	var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

	exports.handler = (event, context, callback) => {
		let obj = {"id":"id","email":"email"}; 
		let uid = uuidv1();
		
				let dbobj = {};
				Object.keys(obj).map(function(key, index) {
					obj[key] = event[key];
					dbobj[key] = {S:event[key]};
				})
				obj['id'] = uid;
				dbobj['id'] = {S:uid};
				let params = {
					Item: dbobj, 
					TableName: "torusmailinglist",
				};
				var formOutput = '<br>';
				for(let item in obj){	
					formOutput += '<span><b>' + item + ': </b>' + obj[item] + '</span><br>'; 
				}
				var emailBody = 'Someone has just registered for the torus.host mailing list. Bellow are their details  <FormOutput>'.replace('<FormOutput>', formOutput)
				dynamodb.putItem(params, function(err, data) {
					if (err) {
						callback(err);
					}
					else {
						var params = {
							Destination: {
								ToAddresses: ["lucas@torus-digital.com"]
							}, 
							Message: {
								Body: {
									Html: {
										Charset: "UTF-8", 
										Data: emailBody
									}, 
									Text: {
										Charset: "UTF-8", 
										Data: "empty"
									}
								}, 
								Subject: {
									Charset: "UTF-8", 
									Data: "Torus Hosting mailing list"
								}
							}, 
							ReplyToAddresses: [], 
							Source: "lucas@torus-digital.com", 
						};
						ses.sendEmail(params, function(err, data) {
							if (err) {
								callback(err);
							} 
							else {
								callback(null, 'Success');
							}   
						});
					}
				});
			
	};
	