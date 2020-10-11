const fs = require('fs');

const apiSchema = require('../scheme/api.json');
const mtprotoSchema = require('../scheme/mtproto.json');

const lines = [];

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

      bitMap.push(`(this.has(params.${param.name}) << ${count})`);
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

      fnName = 'int32';
      args = ['flags'];
    } else if (param.type.includes('?')) {
      let flagType = param.type.split('?')[1];

      if (flagType === 'true') {
        return;
      }

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

      args = [`this.${flagType}`, `params.${param.name}`];
    } else if (typeIsVector(param.type)) {
      let vectorType = param.type.substr(7, param.type.length - 8);

      if (vectorType.charAt(0) === '%') {
        vectorType = vectorType.substr(1);
      }

      if (!aviableTypes.includes(vectorType)) {
        vectorType = 'predicate';
      }

      fnName = 'vector';
      args = [`this.${vectorType}`, `params.${param.name}`];
    } else if (['!X'].includes(param.type)) {
      fnName = 'predicate';
    } else if (!aviableTypes.includes(param.type)) {
      fnName = 'predicate';
    }

    paramsLines.push(`    this.${fnName}(${args.join(', ')});`);
  });

  return paramsLines;
};

const builderMapLines = [];

mtprotoSchema.constructors.forEach(constructor => {
  const { id, predicate, params } = constructor;

  const body = [`    this.int32(${id});`, ...paramsToLines(params)].join('\n');

  builderMapLines.push(
    `  'mt_${predicate}': function(params) {\n${body}\n  },`
  );
});

mtprotoSchema.methods.forEach(method => {
  const { id, method: name, params } = method;

  const body = [`    this.int32(${id});`, ...paramsToLines(params)].join('\n');

  builderMapLines.push(`  'mt_${name}': function(params) {\n${body}\n  },`);
});

apiSchema.constructors.forEach(constructor => {
  const { id, predicate, params } = constructor;

  const body = [`    this.int32(${id});`, ...paramsToLines(params)].join('\n');

  builderMapLines.push(`  '${predicate}': function(params) {\n${body}\n  },`);
});

apiSchema.methods.forEach(method => {
  const { id, method: name, params } = method;

  const body = [`    this.int32(${id});`, ...paramsToLines(params)].join('\n');

  builderMapLines.push(`  '${name}': function(params) {\n${body}\n  },`);
});

lines.push(`const builderMap = {\n${builderMapLines.join('\n')}\n};`);

lines.push('module.exports = builderMap;');

const fileContent = lines.join('\n');

const resultDir = 'src/tl/builder';

if (!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir);
}

fs.writeFileSync('src/tl/builder/index.js', fileContent);
