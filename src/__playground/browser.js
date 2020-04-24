const { mtproto } = require('./common');

const forms = document.querySelectorAll('.form');

forms.forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const method = form.elements.method.value;
    const params = JSON.parse(form.elements.params.value);
    const options = JSON.parse(form.elements.options.value);

    mtproto
      .call(method, params, options)
      .then(result => {
        console.log(`result:`, result);
      })
      .catch(error => {
        console.error(`Error for ${method}:`, error);
      });
  });
});
