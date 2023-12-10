import { mapPsqlShopError } from './psqlShopError.mapper';

describe('mapPsqlShopError', () => {
  it('should return null if both errorDetail and code are not provided', () => {
    const result = mapPsqlShopError();
    expect(result).toBeNull();
  });

  it('should return a ServerError object with status code 409 if code is "23505"', () => {
    const errorDetail = 'Duplicate key value violates unique constraint';
    const code = '23505';
    const result = mapPsqlShopError(errorDetail, code);

    expect(result).toEqual({
      name: 'Error',
      message: 'Shop already exists',
      errorDetail: `${code} - ${errorDetail}`,
      statusCode: 409
    });
  });

  it('should return a ServerError object with status code 500 if code is "23502"', () => {
    const errorDetail = 'Null value in column violates not-null constraint';
    const code = '23502';
    const result = mapPsqlShopError(errorDetail, code);

    expect(result).toEqual({
      name: 'Error',
      message: 'Internal Server Error',
      errorDetail: `${code} - ${errorDetail}`,
      statusCode: 500
    });
  });

  it('should return the GENERIC_SERVER_ERROR object for unknown codes', () => {
    const errorDetail = 'Unknown error';
    const code = '99999';
    const result = mapPsqlShopError(errorDetail, code);

    expect(result).toEqual({
      name: 'Internal Server Error',
      message: 'Internal Server Error',
      errorDetail: 'Internal Server Error',
      statusCode: 500
    });
  });
});