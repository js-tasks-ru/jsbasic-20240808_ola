function checkSpam(str) {
  str = str.toLowerCase()
  return (str.indexOf('1xbet') != -1 || str.indexOf('xxx') != -1) ? true : false;
}
