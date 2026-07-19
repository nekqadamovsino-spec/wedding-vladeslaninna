const weddingDate = new Date('2026-09-14T13:00:00+03:00');

function tick(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = d;
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}

tick();
setInterval(tick,1000);

// Вставьте сюда ссылку веб-приложения Google Apps Script,
// чтобы ответы автоматически сохранялись в Google Таблицу.
const WEB_APP_URL = '';

const guestForm = document.getElementById('guestForm');
const formStatus = document.getElementById('formStatus');

if (guestForm) {
  guestForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = guestForm.querySelector('.submit-btn');
    const formData = new FormData(guestForm);
    const alcohol = formData.getAll('alcohol');

    const payload = {
      name: String(formData.get('name') || '').trim(),
      attendance: String(formData.get('attendance') || ''),
      alcohol: alcohol.length ? alcohol.join(', ') : 'Не указано',
      comment: String(formData.get('comment') || '').trim(),
      wedding: 'Владислав и Инна — 14.09.2026'
    };

    submitButton.disabled = true;
    submitButton.textContent = 'Отправляем…';
    formStatus.textContent = '';

    try {
      if (!WEB_APP_URL) {
        throw new Error('WEB_APP_URL_NOT_SET');
      }

      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify(payload)
      });

      guestForm.reset();
      formStatus.textContent = 'Спасибо! Ваш ответ отправлен ♡';
    } catch (error) {
      if (error.message === 'WEB_APP_URL_NOT_SET') {
        formStatus.textContent = 'Анкета готова. Для получения ответов нужно подключить Google Таблицу через Apps Script.';
      } else {
        formStatus.textContent = 'Не удалось отправить ответ. Попробуйте ещё раз.';
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Отправить анкету';
    }
  });
}
