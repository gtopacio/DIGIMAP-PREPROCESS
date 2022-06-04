const { SQS } = require("@aws-sdk/client-sqs");
const sqs = new SQS({apiVersion: '2012-11-05', region: process.env.AWS_DEFAULT_REGION || 'ap-southeast-1'})
module.exports = async function submitToSQS(id, traj){
    let params = {
        MessageAttributes: {
          "id": {
            DataType: "String",
            StringValue: id
          },
          "traj": {
            DataType: "String",
            StringValue: traj
          }
        },
        MessageBody: "Job ID to be rendered",
        MessageDeduplicationId: id,  // Required for FIFO queues
        MessageGroupId: id,  // Required for FIFO queues
        QueueUrl: process.env.SQS_QUEUE_URL
      }
     return sqs.sendMessage(params);
}