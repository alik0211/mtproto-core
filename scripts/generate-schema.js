const fs = require('fs');

const apiSchema = require('../scheme/api.json');
const mtprotoSchema = require('../scheme/mtproto.json');

const lines = [
  `let serializer = null;`,
  `const int = (value) => serializer.int32(value);`,
  `const long = (value) => serializer.long(value);`,
  `const int128 = (value) => serializer.int128(value);`,
  `const int256 = (value) => serializer.int256(value);`,
  `const string = (value) => serializer.string(value);`,
  `const bytes = (value) => serializer.bytes(value);`,
  `const double = (value) => serializer.double(value);`,
  `const vector = (fn, value) => {`,
  `  int(0x1cb5c415);`,
  `  int(value.length);`,
  `  for (let i = 0; i < value.length; i++) {`,
  `    fn(value[i]);`,
  `  }`,
  `};`,
  `const predicate = (params, bare = false) => {`,
  `  const fn = writerMap[params._];`,
  `  fn(params);`,
  `};`,
  `const Bool = (value) => predicate({ _: value ? 'boolTrue' : 'boolFalse' });`,
  `function has(value) {`,
  `  return +!!(Array.isArray(value) ? value.length : value);`,
  `}`,
  `function flag(fn, value) {`,
  `  if (has(value)) fn(value);`,
  `}`,
  `function flagVector(fn, value) {`,
  `  if (value === undefined || value.length === 0) return;`,
  `  vector(fn, value);`,
  `}`,
  `module.exports = (sharedSerializer, params) => {`,
  `  serializer = sharedSerializer;`,
  `  predicate(params);`,
  `};`,
];

const aviableTypes = [
  'int',
  'long',
  'int128',
  'int256',
  'string',
  'bytes',
  'double',
  'vector',
  'predicate',
  'Bool',
];

const typeIsVector = type =>
  type.substring(0, 6).toLocaleLowerCase() === 'vector';

const calcFlags = params => {
  const bitMap = [];

  params.forEach(param => {
    if (param.type.includes('?')) {
      const count = param.type.split('?')[0].split('.')[1];

      bitMap.push(`(has(params.${param.name}) << ${count})`);
    }
  });

  const flagsLine = `    const flags = ${bitMap.join(' | ')};`;

  return flagsLine;
};

const paramsToLines = params => {
  const paramsLines = [];

  params.forEach(param => {
    let fnName = param.type;
    let args = [`params.${param.name}`];

    // Flags
    if (param.type === '#') {
      const flagsLine = calcFlags(params);

      paramsLines.push(flagsLine);

      fnName = 'int';
      args = ['flags'];
    } else if (param.type.includes('?')) {
      let flagType = param.type.split('?')[1];

      if (typeIsVector(flagType)) {
        flagType = flagType.substr(7, flagType.length - 8);

        fnName = 'flagVector';
      } else {
        fnName = 'flag';
      }

      if (flagType === 'true') {
        flagType = 'Bool';
      }

      if (!aviableTypes.includes(flagType)) {
        flagType = 'predicate';
      }

      args = [flagType, `params.${param.name}`];
    } else if (typeIsVector(param.type)) {
      let vectorType = param.type.substr(7, param.type.length - 8);

      if (vectorType.charAt(0) === '%') {
        vectorType = vectorType.substr(1);
      }

      if (!aviableTypes.includes(vectorType)) {
        vectorType = 'predicate';
      }

      fnName = 'vector';
      args = [vectorType, `params.${param.name}`];
    } else if (['!X'].includes(param.type)) {
      fnName = 'predicate';
    } else if (!aviableTypes.includes(param.type)) {
      fnName = 'predicate';
    }

    paramsLines.push(`    ${fnName}(${args.join(', ')});`);
  });

  return paramsLines;
};

const writerMapLines = [];

mtprotoSchema.constructors.forEach(constructor => {
  const { id, predicate, params } = constructor;

  const body = [`    int(${id});`, ...paramsToLines(params)].join('\n');

  writerMapLines.push(`  'mt_${predicate}': (params) => {\n${body}\n  },`);
});

mtprotoSchema.methods.forEach(method => {
  const { id, method: name, params } = method;

  const body = [`    int(${id});`, ...paramsToLines(params)].join('\n');

  writerMapLines.push(`  'mt_${name}': (params) => {\n${body}\n  },`);
});

apiSchema.constructors.forEach(constructor => {
  const { id, predicate, params } = constructor;

  const body = [`    int(${id});`, ...paramsToLines(params)].join('\n');

  writerMapLines.push(`  '${predicate}': (params) => {\n${body}\n  },`);
});

apiSchema.methods.forEach(method => {
  const { id, method: name, params } = method;

  const body = [`    int(${id});`, ...paramsToLines(params)].join('\n');

  writerMapLines.push(`  '${name}': (params) => {\n${body}\n  },`);
});

lines.push(`const writerMap = {\n${writerMapLines.join('\n')}\n};`);

const fileContent = lines.join('\n');

const resultDir = 'src/tl/builder';

if (!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir);
}

fs.writeFileSync('src/tl/builder/index.js', fileContent);
