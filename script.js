const themes = ["White", "Gray", "Black", "Brown", "Red", "Orange", "Yellow", "Blue", "Green", "Indigo", "Violet", "Pink"];
let currentThemeIndex = 0;

document.getElementById('addInstance').addEventListener('click', addInstance);
document.getElementById('subtractInstance').addEventListener('click', subtractInstance);

function addInstance() {
    const instance = document.createElement('div');
    instance.classList.add('instance');
    instance.innerHTML = `
        <label>Name: <input type="text" class="name"></label>
        <table>
            <tr>
                <td><input type="text" value="STR"></td>
                <td><input type="text" value="DEX"></td>
                <td><input type="text" value="CON"></td>
                <td><input type="text" value="INT"></td>
                <td><input type="text" value="WIS"></td>
                <td><input type="text" value="CHA"></td>
            </tr>
            <tr>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
            </tr>
            <tr>
                <td><input type="text" value="AC"></td>
                <td><input type="text" value="DC"></td>
                <td><input type="text" value="PP"></td>
                <td><input type="text" value="Misc"></td>
                <td><input type="text" value="Misc"></td>
                <td><input type="text" value="Misc"></td>
            </tr>
            <tr>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
                <td><input type="number" min="0" max="99" value="0"></td>
            </tr>
        </table>
        <div class="controls">
            <button class="generate">Generate</button>
            <button class="reset">Reset</button>
        </div>
        <div class="theme-menu">
            <label>Theme:</label>
            <select class="theme-select">
                ${themes.map(theme => `<option value="${theme.toLowerCase()}">${theme}</option>`).join('')}
            </select>
            <button class="cycle-theme">Cycle Theme</button>
        </div>
        <label>Notes: <textarea class="notes"></textarea></label>
        <div class="hover-box"></div>
    `;

    instance.querySelector('.generate').addEventListener('click', generateValues);
    instance.querySelector('.reset').addEventListener('click', resetInputFields);
    instance.querySelector('.theme-select').addEventListener('change', changeTheme);
    instance.querySelector('.cycle-theme').addEventListener('click', cycleTheme);

    document.getElementById('instances').appendChild(instance);
}

function subtractInstance() {
    const instances = document.getElementById('instances');
    if (instances.lastChild) {
        instances.removeChild(instances.lastChild);
    }
}

function generateValues(event) {
    const instance = event.target.closest('.instance');
    const numericInputs = instance.querySelectorAll('tr:nth-child(2) input[type="number"]');
    numericInputs.forEach(input => {
        const values = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
        const [minValue] = values.splice(values.indexOf(Math.min(...values)), 1);
        const sum = values.reduce((acc, val) => acc + val, 0);
        input.value = sum;
        input.dataset.values = `[${values.join(',')},(${minValue})]`;
    });
}

function resetInputFields(event) {
    const instance = event.target.closest('.instance');
    const textInputs = instance.querySelectorAll('input[type="text"]');
    const numberInputs = instance.querySelectorAll('input[type="number"]');
    const textareas = instance.querySelectorAll('textarea');

    textInputs.forEach(input => {
        input.value = input.defaultValue;
    });

    numberInputs.forEach(input => {
        input.value = 0;
    });

    textareas.forEach(textarea => {
        textarea.value = '';
    });
}

function changeTheme(event) {
    const instance = event.target.closest('.instance');
    instance.style.backgroundColor = event.target.value;
}

function cycleTheme(event) {
    const instance = event.target.closest('.instance');
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    instance.querySelector('.theme-select').value = themes[currentThemeIndex].toLowerCase();
    changeTheme({ target: instance.querySelector('.theme-select') });
}
