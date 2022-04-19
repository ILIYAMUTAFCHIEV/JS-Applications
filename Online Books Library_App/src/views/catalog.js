import { html } from '../../node_modules/lit-html/lit-html.js';
import * as itemService from '../api/items.js';


const catalogTemplate = (items) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <ul class="other-books-list">
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

export async function catalogPage(ctx) {
    const items = await itemService.getAll();
    ctx.render(catalogTemplate(items));
}