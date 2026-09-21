

function togglePassword() {
    const input = document.getElementById('password');
    const btn = document.getElementById('toggleCheckbox');
    const isHidden = input.type === 'password';

    input.type = isHidden ? 'text' : 'password';
    btn.setAttribute('aria-pressed', String(isHidden));
    btn.setAttribute('aria-label', isHidden ? 'Приховати пароль' : 'Показати пароль');
}



const library = {
    ua: {
        name: 'Українська',
        alphabet: [
            'а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й',
            'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч',
            'ш', 'щ', 'ь', 'ю', 'я',
            'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й',
            'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч',
            'Ш', 'Щ', 'Ь', 'Ю', 'Я'
        ]
    },
    en: {
        name: 'English',
        alphabet: [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
    }
};



class SuccessPopup {
    constructor() {
        this.popup = document.getElementById('popUp');
        this.closeButton = document.getElementById('closeButton');
        this.close = document.getElementById('closePopUp');
        this.userName = document.getElementById('userName');
        this.interval = null;

        this.closeButton.addEventListener('click', () => this.openClose(true));
        this.close.addEventListener('click', () => this.openClose(true));
    }

    openClose(hide) {
        this.popup.classList.toggle('hidden', hide);
        if (hide && this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    writeName(name) {
        this.openClose(false);


        const alphabet = [...library.ua.alphabet, ...library.en.alphabet];

        this.userName.innerHTML = '';

        let str = '';
        let i = 0;
        let remaining = name;

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            if (remaining === '') {
                clearInterval(this.interval);
                this.interval = null;
                return;
            }

            const target = remaining[0];

          
            if (!alphabet.includes(target)) {
                str += target;
                this.userName.innerHTML = str;
                i = 0;
                remaining = remaining.slice(1);
                return;
            }

            const elem = alphabet[i];

            this.userName.innerHTML = `${str}${elem}`;
            i++;

            if (elem === target) {
                str += elem;
                i = 0;
                remaining = remaining.slice(1);
                this.userName.innerHTML = str;
            }

            if (remaining === '') {
                clearInterval(this.interval);
                this.interval = null;
            }
        }, 35);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleCheckbox');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', togglePassword);
    }

    const successPopup = new SuccessPopup();

    const form = document.querySelector('.login_form form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameField = document.getElementById('name');
            const surnameField = document.getElementById('surname');

            const fullName = [nameField.value.trim(), surnameField.value.trim()]
                .filter(Boolean)
                .join(' ') || 'Гість';

            successPopup.writeName(fullName);
        });
    }
});