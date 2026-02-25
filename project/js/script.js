"use strict"

document.addEventListener('DOMContentLoaded', () => {
	const burgerBtn = document.getElementById('menu');
	const pageBody = document.body;
	const header = document.querySelector('.header');

	if (!burgerBtn || !header) {
		console.warn('Бургер‑меню: елементів не знайдено у DOM!');
		return;
	}

	burgerBtn.addEventListener('click', () => {
		pageBody.classList.toggle('menu-open');
		burgerBtn.classList.toggle('icon-menu--active');
		pageBody.classList.toggle('lock');
	});

	document.querySelectorAll('.menu__link').forEach(link => {
		link.addEventListener('click', (e) => {
			const targetID = link.getAttribute('href');

			if (!targetID.startsWith('#')) return;

			const targetSection = document.querySelector(targetID);
			if (!targetSection) return;

			e.preventDefault(); 

		
			const headerHeight = header.offsetHeight;
			const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

			window.scrollTo({
				top: sectionTop,
				behavior: 'smooth'
			});

			pageBody.classList.remove('menu-open');
			pageBody.classList.remove('lock');
			burgerBtn.classList.remove('icon-menu--active');
		});
	});
});


// Валідація форми
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

if (form && nameInput && emailInput && messageInput && nameError && emailError && messageError) {
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		let valid = true;

		// Очистка попередніх повідомлень
		nameError.textContent = "";
		emailError.textContent = "";
		messageError.textContent = "";

		// Перевірка імені
		const nameValue = nameInput.value.trim();
		if (nameValue === "") {
			nameError.textContent = "Введіть ім'я";
			valid = false;
		} else if (nameValue.length < 2) {
			nameError.textContent = "Ім'я повинно бути мінімум 2 символи";
			valid = false;
		}

		// Перевірка email
		const emailValue = emailInput.value.trim();
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailValue === "") {
			emailError.textContent = "Введіть email";
			valid = false;
		} else if (!emailPattern.test(emailValue)) {
			emailError.textContent = "Некоректний email";
			valid = false;
		}

		// Перевірка повідомлення
		const messageValue = messageInput.value.trim();
		if (messageValue === "") {
			messageError.textContent = "Введіть повідомлення";
			valid = false;
		} else if (messageValue.length < 10) {
			messageError.textContent = "Повідомлення повинно бути мінімум 10 символів";
			valid = false;
		}

		if (!valid) return;

		// --- Симуляція відправки ---
		const params = new URLSearchParams({
			name: nameValue,
			email: emailValue,
			message: messageValue
		});
		console.log("Дані для відправки:", params.toString());

		setTimeout(() => {
			alert("Форма успішно відправлена!");
			form.reset();
		}, 500);
	});
} else {
	console.warn("Деякі елементи форми не знайдено у DOM!");
}

//======================Popup================

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.body;
let unlock = true;
const timeout = 500;

// Відкриття попапа по кліку на посилання
if (popupLinks.length > 0) {
	popupLinks.forEach(popupLink => {
		popupLink.addEventListener('click', e => {
			e.preventDefault();
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			if (currentPopup) popupOpen(currentPopup);
		});
	});
}

// Закриття попапа по кнопці
const popupCloseIcons = document.querySelectorAll('.popup__close');
if (popupCloseIcons.length > 0) {
	popupCloseIcons.forEach(el => {
		el.addEventListener('click', e => {
			e.preventDefault();
			const popup = el.closest('.popup');
			if (popup) popupClose(popup);
		});
	});
}

// Функція відкриття
function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}

		currentPopup.classList.add('open');

		// Закриття по кліку на overlay
		currentPopup.addEventListener('click', e => {
			if (!e.target.closest('.popup__content')) {
				popupClose(currentPopup);
			}
		});
	}
}

// Функція закриття
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) bodyUnLock();
	}
}

// Блокування скролу при відкритті
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout);
}

// Розблокування скролу
function bodyUnLock() {
	setTimeout(() => {
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);
}

// Закриття ESC
document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) popupClose(popupActive);
	}
});