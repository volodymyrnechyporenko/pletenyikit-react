export const BUILD_DATE =
  process.env.NODE_ENV === 'test'
    ? new Date().toDateString()
    : import.meta.env.BUILD_DATE || new Date().toDateString();
