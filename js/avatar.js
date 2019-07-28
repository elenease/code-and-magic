'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var dropZone = document.querySelector('.upload input[name="avatar"]');
  var preview = document.querySelector('.setup-user-pic');

  var avatarDropHandler = function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function (evtLoad) {
        preview.src = evtLoad.target.result;
      });

      reader.readAsDataURL(file);

      dropZone.removeEventListener('dragover', avatarDragoverHandler);
      dropZone.removeEventListener('dragleave', avatarDragleaveHandler);

      preview.style.outline = 0;
      dropZone.title = 'Отличный выбор!';
    }
  };

  var avatarChangeHandler = function (evt) {
    evt.preventDefault();

    var file = dropZone.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
      dropZone.title = 'Отличный выбор!';
    }
  };

  var avatarDragoverHandler = function (evt) {
    preview.style.outline = '2px solid #f87421';
    evt.preventDefault();
  };

  var avatarDragleaveHandler = function () {
    preview.style.outline = 0;
  };

  dropZone.addEventListener('drop', avatarDropHandler);

  dropZone.addEventListener('dragover', avatarDragoverHandler);

  dropZone.addEventListener('dragleave', avatarDragleaveHandler);

  dropZone.addEventListener('change', avatarChangeHandler);
})();
