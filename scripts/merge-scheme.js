const fs = require('fs');

const { intToUint } = require('../src/utils/common');
const mtprotoSchema = require('../scheme/mtproto.json');
const apiSchema = require('../scheme/api.json');

const result = {
  constructorsById: {},
  methodsByName: {},
  constructorsIdsByPredicate: {},
};

mtprotoSchema.constructors.forEach(handleConstructors);
mtprotoSchema.methods.forEach(handleMethods);
apiSchema.constructors.forEach(handleConstructors);
apiSchema.methods.forEach(handleMethods);

function handleConstructors(constructor) {
  constructor.id = intToUint(constructor.id);

  if (constructor.id in result.constructorsById) {
    console.log(`constructor.id ${constructor.id} dublicate`);
  }

  if (constructor.predicate in result.constructorsIdsByPredicate) {
    console.log(`constructor.predicate ${constructor.predicate} dublicate`);
  }

  result.constructorsById[constructor.id] = constructor;
  result.constructorsIdsByPredicate[constructor.predicate] = constructor.id;
}

function handleMethods(method) {
  method.id = intToUint(method.id);

  if (method.method in result.methodsByName) {
    console.log(`method ${method.method} dublicate`);
  }

  result.methodsByName[method.method] = method;
}

const fileContent = `const schema = ${JSON.stringify(result, null, 2)};

module.exports = { schema };`;

fs.writeFileSync('scheme/index.js', fileContent);
