/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

import createElement from '../../assets/lib/create-element.js';

export default class UserTable {
  #rows = [];

  constructor(rows) {
    this.#rows = rows || this.#rows;

    this.elem = this.#render();
  }

  #template() {
    return `
      <table>
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
        ${this.#rows.map(value => `
            <tr>
            <td>${value.name}</td>
            <td>${value.age}</td>
            <td>${value.salary}</td>
            <td>${value.city}</td>
            <td><button>X</button></td>
            </tr>
        `).join('')}
        </tbody>
      </table>
    `
  }

  #render() {
    this.elem = createElement(this.#template());
    this.elem.addEventListener('click', this.#onButtonClick);

    return this.elem;
  }

  #onButtonClick = (event) => {
    const button = event.target.closest('button');
    if (button) {
      button.closest('tr').remove();
    }
  }
}
