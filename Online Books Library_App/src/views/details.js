import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as itemService from '../api/items.js';


const detailsTemplate = (item, onDelete) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${item.title}</h3>
                <p class="type">Type: ${item.type}</p>
                <p class="img"><img src=${item.imageUrl}></p>
                <div class="actions">
                    ${item.isOwner
                    ? html`
                        <a class="button" href="/edit/${item._id}">Edit</a>
                        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
                    `
                    : nothing}
                   
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${item.description}</p>
            </div>
        </section>
`;

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemService.getById(itemId);

    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
    }
    ctx.render(detailsTemplate(item, onDelete));

    async function onDelete() {
        const conformation = confirm('Are you sure you want to delete this item!');

        if (conformation) {
            await itemService.deleteById(itemId);
            ctx.page.redirect('/catalog');
        } 
    }
}