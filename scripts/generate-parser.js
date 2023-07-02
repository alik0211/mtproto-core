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
  'mt_message',
  'vector',
  'predicate',
];

const bodyById = new Map([
  [481674261, 'return this.vector(this.predicate, true);'],
  [3162085175, 'return false;'],
  [2574415285, 'return true;'],
  [1072550713, 'return true;'],
  [1450380236, 'return null;'],
  [812830625, 'return this.gzip();'],
]);

const typeIsVector = (type) =>
  type.substring(0, 6).toLocaleLowerCase() === 'vector';

const calcFlag = (name, type) => {
  const [left, flagType] = type.split('?');
  const [flagsName, flagBit] = left.split('.');

  const condition = `result.${flagsName} & ${2 ** Number(flagBit)}`;

  let fnName = flagType;
  let args = [];

  if (flagType === 'true') {
    return `result.${name} = !!(${condition});`;
  } else if (typeIsVector(flagType)) {
    let vectorType = flagType.substr(7, flagType.length - 8);

    if (!aviableTypes.includes(vectorType)) {
      vectorType = 'predicate';
    }

    fnName = 'vector';
    args = [`this.${vectorType}`];
  } else if (!aviableTypes.includes(flagType)) {
    fnName = 'predicate';
  }

  return `if (${condition}) result.${name} = this.${fnName}(${args.join(
    ', '
  )});`;
};

const parserMapLines = [];

const paramsToLines = (params) => {
  const paramsLines = [];

  params.forEach((param) => {
    let fnName = param.type;
    let args = [];

    if (param.type === '#') {
      fnName = 'int';
    } else if (param.type.includes('?')) {
      const flagLine = calcFlag(param.name, param.type);

      paramsLines.push(flagLine);

      return;
    } else if (typeIsVector(param.type)) {
      let vectorType = param.type.substr(7, param.type.length - 8);

      const isBare = vectorType.charAt(0) === '%';

      if (isBare) {
        vectorType = 'mt_message';
      }

      if (!aviableTypes.includes(vectorType)) {
        vectorType = 'predicate';
      }

      fnName = 'vector';
      args = [`this.${vectorType}`, isBare];
    } else if (!aviableTypes.includes(param.type)) {
      fnName = 'predicate';
    }

    paramsLines.push(
      `result.${param.name} = this.${fnName}(${args.join(', ')});`
    );
  });

  return paramsLines;
};

mtprotoSchema.constructors.forEach((constructor) => {
  const { predicate, params } = constructor;

  const id = constructor.id >>> 0;

  const body = bodyById.has(id)
    ? bodyById.get(id)
    : [
        `const result = { _: 'mt_${predicate}' };`,
        ...paramsToLines(params),
        'return result;',
      ].join('\n');

  parserMapLines.push(`  [${id}, function() {\n${body}\n  }],`);
});

apiSchema.constructors.forEach((constructor) => {
  const { predicate, params } = constructor;

  const id = constructor.id >>> 0;

  const body = bodyById.has(id)
    ? bodyById.get(id)
    : [
        `const result = { _: '${predicate}' };`,
        ...paramsToLines(params),
        'return result;',
      ].join('\n');

  parserMapLines.push(`  [${id}, function() {\n${body}\n  }],`);
});

lines.push(`const parserMap = new Map([\n${parserMapLines.join('\n')}\n]);`);

lines.push('module.exports = parserMap;');

const fileContent = lines.join('\n');

const resultDir = 'src/tl/parser';

if (!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir);
}

fs.writeFileSync('src/tl/parser/index.js', fileContent);
