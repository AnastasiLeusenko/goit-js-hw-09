const form = document.querySelector('.feedback-form');
let formData = { email: "", message: "" };
const localStorageKey = "feedback-form-state";

function saveToLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function loadFromLocalStorage() {
    try {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            formData = JSON.parse(storedData);
            form.elements.email.value = formData.email;
            form.elements.message.value = formData.message;
        }
    } catch (error) {
        console.error("Помилка при завантаженні з локального сховища:", error);
        localStorage.removeItem(localStorageKey); // Очищаємо пошкоджені дані
    }
}

loadFromLocalStorage();

form.addEventListener('input', (event) => {
    const { name, value } = event.target;
    formData[name] = value.trim();
    saveToLocalStorage();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (formData.email.trim() === "" || formData.message.trim() === "") {
        alert("Fill please all fields");
        return;
    }

    console.log(formData);

    localStorage.removeItem(localStorageKey);
    formData = { email: "", message: "" };
    form.reset();
});