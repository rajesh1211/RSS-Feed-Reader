var app = (function(){

  function sortAlgo(strings) {
      sort(strings, 0, strings.length - 1);
      return strings;
  }

  function sort(strings, lo, hi) {
      if (lo >= hi) return;
      var index = partition(strings, lo, hi);
      sort(strings, lo, index - 1);
      sort(strings, index + 1, hi);
  }

  function partition(strings, lo, hi) {
      var i = lo,
          j = hi + 1;
      while (true) {
          while (strings[++i].length < strings[lo].length) {
              if (i == hi) break;
          }
          while (strings[--j].length > strings[lo].length) {
              if (j == lo) break;
          }
          if (i >= j) break;
          var number = strings[i];
          strings[i] = strings[j];
          strings[j] = number;
      }
      var value = strings[lo];
      strings[lo] = strings[j];
      strings[j] = value;
      return j;
  }

  this.uploadFile = function() {
    var file    = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var contents = event.target.result;
        if (contents) {
          contents = contents.split("\n");
          var numberOfStrings =  parseInt(contents[0]);
          var strings = contents.slice(1,contents.length-1);

          for(item in strings) {
            console.log(strings[item]);
            var el = document.getElementById('input');
            el.innerHTML += strings[item]+"<br/>"
          }

          strings = sortAlgo(strings);
          for(item in strings) {
            console.log(strings[item]);
            var el = document.getElementById('output');
            el.innerHTML += strings[item]+"<br/>"
          }
        }

        var fileInputElement = document.getElementById('file');
        fileInputElement.parentNode.replaceChild(
            fileInputElement.cloneNode(true), 
            fileInputElement
        );
    };

    reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };
    reader.readAsText(file,"UTF-8");
  }

  return this;
})();