// Thanks to khan4019
// http://khan4019.github.io/front-end-Interview-Questions/sort.html#quickSort
(function () {
  if (!Array.prototype.qsort) {
    Object.defineProperty(Array.prototype, 'qsort', {
      value : function (cmp) {
        if ('function' !== typeof cmp) {
          cmp = function (a, b) {
            // var d = ( direction === 'asc' ) ? 1 : -1;
            if (!(isNaN(a) || isNaN(b))) {
              a = parseFloat(a);
              b = parseFloat(b);
            }
            if (a < b) { return -1; } // -d
            if (a > b) { return  1; } //  d
            return 0;
          };
        }

        function swap(arr, x, y) {
          arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
        }

        function partition(arr, pivot, left, right) {
          var pivotValue     = arr[pivot],
              partitionIndex = left;

          for (var i = left; i < right; i++) {
            if (cmp(arr[i], pivotValue) < 0) {
              swap(arr, i, partitionIndex);
              partitionIndex++;
            }
          }
          swap(arr, right, partitionIndex);
          return partitionIndex;
        }

        function quickSort(arr, left, right) {
          var pivot,
              partitionIndex;

          if (left < right) {
            pivot          = right;
            partitionIndex = partition(arr, pivot, left, right);

            //sort left and right
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
          }
          return arr;
        }

        quickSort(this, 0, this.length - 1);
        return this;
      }
    });
  }
})();
