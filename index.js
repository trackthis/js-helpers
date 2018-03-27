require('./lib/array_fill');
require('./lib/array_intersect');
require('./lib/array_qsort');
require('./lib/array_unique');
require('./lib/fs_scandir');
require('./lib/object_watch');
require('./lib/string_format');
require('./lib/string_pipe');

module.exports = {
  flatten : require('./lib/flatten'),
  get     : require('./lib/get_deep'),
  set     : require('./lib/set_deep')
};
