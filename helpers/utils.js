import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import Bottleneck from 'bottleneck';

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

addFormats(ajv);
let limiterInstance;


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



function toBool(value, defaultValue = true) {
  if (value === undefined) return defaultValue;
  return String(value).toLowerCase() === 'true';
}

const enabled = toBool(process.env.RATE_LIMIT_ENABLED, false);

// defaults “seguros”
const perMin = Number(process.env.RATE_LIMIT_PER_MIN || 100);
const maxConcurrent = Number(process.env.RATE_LIMIT_MAX_CONCURRENT || 1);

// evita divisão por 0 / valores inválidos
const safePerMin = Number.isFinite(perMin) && perMin > 0 ? perMin : 100;
const minTime = Math.ceil(60000 / safePerMin);

/**
 * Limitador de requisição para evitar o estouro de 100 request por min
 */
function isEnabled() {
  return process.env.RATE_LIMIT_ENABLED === 'true';
}

function getLimiter() {
  if (limiterInstance !== undefined) return limiterInstance;

  if (!isEnabled()) {
    limiterInstance = null;
    return limiterInstance;
  }

  const perMin = Number(process.env.RATE_LIMIT_PER_MIN);
  const maxConcurrent = Number(process.env.RATE_LIMIT_MAX_CONCURRENT);

  const minTime = Math.ceil(60000 / perMin);

  limiterInstance = new Bottleneck({
    minTime,
    maxConcurrent
  });

  return limiterInstance;
}

export function schedule(fn) {
  const limiter = getLimiter();
  if (!limiter) return Promise.resolve().then(fn);
  return limiter.schedule(fn);
}
