import { html } from '../../node_modules/lit-html/lit-html.js';
import * as itemService from '../api/items.js';


const catalogTemplate = (items) => html`
<section id="catalog-page">
    <h1>All Games</h1>

    ${items.length > 0
        ? items.map(cardTemplate)
        : html`<h3 class="no-articles">No articles yet</h3>`
    }
    
</section>
`;

const cardTemplate = (item) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${item.imageUrl}>
        <h6>${item.category}</h6>
        <h2>${item.title}</h2>
        <a href="/details/${item._id}" class="details-button">Details</a>
    </div>
</div>
`;

export async function catalogPage(ctx) {
    const items = await itemService.getAll();
    ctx.render(catalogTemplate(items));
}