export default handlerFn => async (event, context) => {
  let res, err;

  try {
    res = await handlerFn(event, context);
  } catch (error) {
    err = error;
  } finally {
    if (err) {
      console.error(err);
    } else if (res) {
      console.log(res);
    }
  }

  if (err) {
    throw err;
  } else {
    return res;
  }
};
