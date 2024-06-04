document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = Number(form.delay.value);
    const state = form.state.value;

    createPromise(delay, state)
      .then((result) => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${result}ms`,
        });
      })
      .catch((error) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${error}ms`,
        });
      });
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }
});
