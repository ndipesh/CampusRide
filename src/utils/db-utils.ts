import { QueryFailedError } from 'typeorm';

type DatabaseConstraintError = {
  type:
    | 'unique'
    | 'check'
    | 'not null'
    | 'foreign key'
    | 'invalid input'
    | 'string too long'
    | 'numeric overflow'
    | 'invalid datetime'
    | 'unknown';
  columnName?: string;
  message?: string;
  status?: number;
};

function parseDatabaseError(err: unknown): DatabaseConstraintError {
  if (!(err instanceof QueryFailedError)) {
    return { type: 'unknown', message: 'An unknown database error has occurred.' };
  }

  const { code, column, detail } = err.driverError;

  switch (code) {
    case '23505': {
      const match = detail?.match(/Key \((.+?)\)=/);
      const columnName = match?.[1] ?? '';
      return {
        type: 'unique',
        columnName,
        message: `The '${columnName}' property must be unique.`,
      };
    }
    case '23502': {
      const columnName = column ?? '';
      return {
        type: 'not null',
        columnName,
        message: `The '${columnName}' property must not be null.`,
      };
    }
    case '23514':
      return { type: 'check', message: 'Failed a check constraint.' };
    case '23503': {
      const match = detail?.match(/Key \((.+?)\)=/);
      const columnName = match?.[1] ?? '';
      return {
        type: 'foreign key',
        columnName,
        message: `The '${columnName}' property references a non-existent record.`,
      };
    }
    case '22P02':
      return {
        type: 'invalid input',
        message: 'Invalid input syntax (e.g., malformed UUID or wrong data type).',
      };
    case '22001':
      return {
        type: 'string too long',
        message: 'A string value exceeds the maximum allowed length.',
      };
    case '22003':
      return { type: 'numeric overflow', message: 'A numeric value is out of the allowed range.' };
    case '22007':
      return { type: 'invalid datetime', message: 'Invalid date or time format.' };
    default:
      return { type: 'unknown', message: 'An unknown database error has occurred.' };
  }
}

export { parseDatabaseError };
