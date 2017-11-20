export const findImagesAndSetId = (obj, key) => {
  for (let i in obj) {
    if (i == key) {
      obj[key].map(el => {
        if (el.image) {
          el.image = el.image.id;
        }
      });
    }
  }
  return obj;
};

export const filterObject = (obj, key) => {
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      filterObject(obj[i], key);
    }
    if (i == key) {
      delete obj[key];
    }
  }
  return obj;
};

export const getCookie = (name) => {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length == 2)
        return parts
            .pop()
            .split(';')
            .shift();
}
