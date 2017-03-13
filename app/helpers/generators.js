export function* log(message, param = null) {
  if (param) {
    console.log(message, param);
  }else {
    console.log(message);
  }
}

export function* errLog(message, param = null) {
  if (param) {
    console.error(message, param)
  } else {
    console.error(message)
  }
}
