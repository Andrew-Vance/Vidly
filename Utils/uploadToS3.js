const AWS = require('aws-sdk');
const config = require('./aws-config.js');

module.exports = async (name, data, contentType) => {
  let params = {
    Bucket: 'vidly-videos',
    Key: name,
    Body: data,
    ACL: 'public-read',
    ContentType: contentType
  };

  const s3 = new AWS.S3(config);

  let obj = await s3.upload(params).promise();
  return obj.Location;
};