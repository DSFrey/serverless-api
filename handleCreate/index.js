const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

const people = dynamoose.model('people-lab-18', schema);

exports.handler = async (event) => {
  try {
    let newItem = await people.create(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(newItem)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
}