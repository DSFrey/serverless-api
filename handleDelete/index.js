const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

const people = dynamoose.model('people-lab-18', schema);

exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id;
    await people.delete({ id });
    return {
      statusCode: 200,
      body: 'Item deleted'
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
}