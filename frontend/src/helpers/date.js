
export const dateHelper = {
  toText: (dateString) => {
    let elements = dateString.split('-', 2);
    return "Th" + elements[1].replace(/^0+/, '') + ' ' + elements[0];
  }
}