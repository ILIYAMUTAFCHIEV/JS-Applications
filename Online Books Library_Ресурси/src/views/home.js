import { html } from '../../node_modules/lit-html/lit-html.js';
import * as itemService from '../api/items.js';
import { getUserData } from '../util.js';

const homeTemplate = (items) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <ul class="my-books-list">
        ${items.length > 0 
           ? items.map(cardTemplate)
           : html`<p class="no-books">No books in database!</p>`
       }
    </ul>

</section>
`;

const cardTemplate = (item) => html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>
`;

export async function homePage(ctx) {
    const user = getUserData();
    const items = await itemService.getMybooks(user._id);

    ctx.render(homeTemplate(items));
}