const fs = require('fs');

const schema = require('../scheme/api.json');

const lines = [];

const excludedTypes = ['Bool', 'True', 'Null', 'Vector t'];

function sanatizeName(name) {
  return name.replace(/\./g, '_');
}

function generateType(type) {
  let array = false;
  let optional = false;

  if (type.includes('flags') && type.includes('?')) {
    optional = true;
    type = type.split('?')[1];
  }

  if (type.includes('Vector')) {
    array = true;
    const regex = /<(.*?)>/;
    const matches = regex.exec(type);
    if (matches && matches.length >= 2) {
      type = matches[1];
    }
  }

  if (type === 'int' || type === 'long' || type === 'double' || type === '#') {
    optional = true;
    type = 'number';
  } else if (type === 'string') {
    optional = true;
    type = 'string';
  } else if (type === 'Bool' || type === 'true') {
    optional = true;
    type = 'boolean';
  } else if (type === 'bytes') {
    optional = true;
    type = 'Uint8Array';
  } else if (type === '!X' || type === 'X') {
    type = 'unknown';
  } else {
    type = sanatizeName(type);
  }

  return { type: `${array ? `Array<${type}>` : type}`, optional };
}

function generateTypeLine(input) {
  let { name } = input;
  let { type, optional } = generateType(input.type);

  return `${name}${optional ? '?' : ''}: ${type};`;
}

lines.push('export interface Methods {');

schema.methods.forEach((method) => {
  const methodName = method.method.indexOf('.') > -1 ? `'${method.method}'` : method.method;
  lines.push(`  ${methodName}: {`);

  if (method.params.length === 0) {
    lines.push(`    params?: {};`);
  } else {
    lines.push(`    params: {`);
    method.params.forEach((param) => {
      if (param.name === 'flags') return;
      lines.push(`      ${generateTypeLine(param)}`);
    });
    lines.push(`    };`);
  }
  lines.push(`    return: ${generateType(method.type).type};`);
  lines.push(`  };`);
});

lines.push('};\n');

let finishedTypes = [];

schema.constructors.forEach((constructor) => {
  if (
    excludedTypes.includes(constructor.type) ||
    finishedTypes.findIndex((t) => t === constructor.type) >= 0
  ) {
    return;
  }

  let name = sanatizeName(constructor.type);

  const variants = [];
  const constructors = schema.constructors.filter((c) => c.type === constructor.type);

  constructors.forEach((constructorVariant) => {
    let variantName = sanatizeName(constructorVariant.predicate);

    lines.push(`export type ${variantName} = {`);
    lines.push(`  _: '${constructorVariant.predicate}';`);
    constructorVariant.params.forEach((param) => {
      lines.push(`  ${generateTypeLine(param)}`);
    });
    lines.push('};');
    variants.push(variantName);
  });

  lines.push(`export type ${name} = ${variants.join(' | ')};\n`);

  finishedTypes.push(constructor.type);
});

const fileContent = lines.join('\n');

fs.writeFileSync('src/tl/types/schema.d.ts', fileContent);
