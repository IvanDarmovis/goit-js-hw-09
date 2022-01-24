import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayEl: document.querySelector("[name='delay']"),
  stepEl: document.querySelector("[name='step']"),
  amountEl: document.querySelector("[name='amount']"),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  let k = 0;
  ev.preventDefault();
  const { delay, step, amount } = ev.currentTarget;
  for (let i = 0; i < amount.value; i += 1) {
    k = +delay.value + step.value * i;
    createPromise(i + 1, k);
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve('✅ Fulfilled promise');
    }
    reject('❌ Rejected promise');
  });
  setTimeout(() => {
    promise
      .then(result => Notiflix.Notify.success(`${result} ${position} in ${delay}ms`))
      .catch(error => Notiflix.Notify.failure(`${error} ${position} in ${delay}ms`));
  }, delay);
}
