const barerExtract = (token: string):string => {
  const auth = token.split(' ')[1];
  return auth;
};

export default barerExtract;