function handleConstructors (schema, constructor) {
  constructor.id = intToUint(constructor.id);

  if (constructor.id in schema.constructorsById) {
    console.warn(`TL schema constructor ID duplicate: ${constructor.id}`);
  }

  if (constructor.predicate in schema.constructorsIdsByPredicate) {
    console.warn(`TL schema constructor predicate duplicate: ${constructor.predicate}`);
  }

  schema.constructorsById[constructor.id] = constructor;
  schema.constructorsIdsByPredicate[constructor.predicate] = constructor.id;
}

function handleMethods (schema, method) {
  method.id = intToUint(method.id);

  if (method.method in schema.methodsByName) {
    console.warn(`TL schema method duplicate: ${method.method}`);
  }

  schema.methodsByName[method.method] = method;
}

async function getSchema (schema, existingSchema = null) {
  const result = existingSchema !== null
    ? existingSchema
    : {
      constructorsById: {},
      methodsByName: {},
      constructorsIdsByPredicate: {},
    };

  schema.constructors.forEach(e => handleConstructors(result, e));
  schema.methods.forEach(e => handleMethods(result, e));

  return result;
}

module.exports = { getSchema };
