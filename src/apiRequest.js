const apiRequest = async (url = "", optionsObj = null) => {
  let errMsg = null;
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error(`Please reload the app`);
  } catch (error) {
    errMsg = error.mesage;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
