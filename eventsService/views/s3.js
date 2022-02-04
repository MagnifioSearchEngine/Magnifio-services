require("dotenv").config();
const AWS = require("aws-sdk");

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.log("AWS not configuried!");
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFile = (filename, mimetype, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename + "-" + Date.now(),
      Bucket: "sample-test-lambda-function",
      Body: file,
      ContentType: mimetype,
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = uploadFile;
