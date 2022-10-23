const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

const people = dynamoose.model('people-lab-18', schema);

exports.handler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    let data;
    if (id) {
      let search = await people.query('id').eq(id).exec();
      data = search[0]
    } else {
      data = await people.scan().exec();
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
}