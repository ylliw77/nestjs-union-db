type MappedQuery<T> = {
  [P in keyof T]?: T[P] | any[];
};
