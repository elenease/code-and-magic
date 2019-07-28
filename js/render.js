'use strict';

// ГЕНЕРАЦИЯ ПОХОЖЕГО МАГА

(function () {
  window.userDialog = document.querySelector('.setup');

  // Блок для вставки списка магов.
  var similarListElement = window.userDialog.querySelector('.setup-similar-list');

  // Шаблон для генерации мага.
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Рендерим мага
  window.renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    return wizardElement;
  };

  // Добавляем всех магов в целевой блок
  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizards.length > 4 ? 4 : wizards.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Формирование объекта FormData и закрытие окна после успешной отправки
  var form = window.userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);

    var saveHandler = function () {
      window.userDialog.classList.add('hidden');
    };

    window.backend.save(formData, saveHandler, window.errorHandler);
  });
})();
