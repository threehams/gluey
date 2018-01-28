export const pages = ["Foo", "Bar"];

export const nextIndex = index => ++index % pages.length;

export const indexFromPath = path => {
  path = path === "/" ? "/Foo" : path;
  return pages.indexOf(path.substr(1));
};
