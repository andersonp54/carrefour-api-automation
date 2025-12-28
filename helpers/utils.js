import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

addFormats(ajv);

/**
 * Valida "data" contra "schema" (JSON Schema - AJV)
 */
export function schemaValidator(data, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (Array.isArray(data)) {
    if (data.length === 0) {
      throw new Error('Response data is empty');
    }
  } else if (data === null || data === undefined) {
    throw new Error('Response data is empty');
  }

  if (!valid) {
    const errors = validate.errors.map(err => {
      const path = err.instancePath || '/';
      return `${path} ${err.message}`;
    });

    throw new Error(`Schema validation failed: ${errors.join(' | ')}`);
  }
}

/**
 * Gerar uma "string" com 5 caracteres random
 */
export function random5() {
  return Math.random()
    .toString(36)
    .slice(2, 7);
}