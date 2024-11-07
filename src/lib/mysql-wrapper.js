import mysql from './mysql.js';

export default handlerFn => async (event, context) => {
  let res, err;

  try {
    context.callbackWaitsForEmptyEventLoop = false;
    res = await handlerFn.call({ mysql }, event, context);
  } catch (error) {
    err = error;
  } finally {
    await mysql.end();
  }

  if (err) {
    throw err;
  } else {
    return res;
  }
};
