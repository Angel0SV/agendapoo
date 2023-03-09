let id = 1;
const form = document.querySelector('.form-add')


class Contact {
    constructor(name, phone, email, id) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.id = id;
    }
}

class User {
    constructor() {
        this.contactos = [];
    }
    addContact(contact) {
        this.contactos.push({id:contact.id, name: contact.name, phone: contact.phone, email: contact.email})
    }
    loadContacts() {
        const container = document.querySelector('.contacts__content');
        container.innerHTML = "";
        this.contactos.forEach((e) => {
            const struct = `
            <div id="${e.id}" class="contacts__content__element">
                    <h3>${e.name}</h3>
                    <p>Número: ${e.phone}</p>
                    <p>Email: ${e.email}</p>
                    <div class="buttons">
                        <button id="button__edit" data-id=${e.id} class="fa-solid fa-pen-to-square">
                            
                        </button>
                        <button id="button__delete" class="fa-solid fa-x">
                            
                        </button>
                    </div>
            </div>
            `

            container.innerHTML += struct;
        }) 
    }
    searchContact(name) {
        const container = document.querySelector('.contacts__content');
        container.innerHTML = "";
        if(this.contactos.length === 0) {
            const h2 = document.createElement('h2');
            h2.textContent = 'Aún no tienes contactos';
            container.appendChild(h2)
        } else {
            this.contactos.forEach(e => {
                const minus = e.name.toLowerCase();
                if(minus.includes(name)) {
                    const struct = `
                    <div id="${e.id}" class="contacts__content__element">
                        <h3>${e.name}</h3>
                        <p>Número: ${e.phone}</p>
                        <p>Email: ${e.email}</p>
                        <div class="buttons">
                            <button id="button__edit" data-id=${e.id} class="fa-solid fa-pen-to-square">
                                
                            </button>
                            <button id="button__delete" class="fa-solid fa-x">
                                
                            </button>
                        </div>
                    </div>
                `;
                    container.innerHTML += struct;
                }
            }) 
        }
               
    }

    deleteContact(c) {
        const id = c.parentElement.parentElement.id;
        c.parentElement.parentElement.remove();
        this.contactos.forEach((e,i) => {
            if(e.id == id) {
                this.contactos.splice(i, 1);
            }
        })
    }

    sendChange() {
        console.log('send')
        const id = document.querySelector('#button__send').dataset.id;
        console.log(id)
        const inputName = document.querySelector('#editName').value;
        const inputPhone = document.querySelector('#editPhone').value;
        const inputEmail = document.querySelector('#editEmail').value;
        for(let e of this.contactos) {
            if(e.id == id) {
                e.name = inputName;
                e.phone = inputPhone;
                e.email = inputEmail;
                break;
            }
        };
        console.log(this.contactos)
        this.loadContacts();
    }

    updateContact(id) {
        document.querySelector('#button__send').dataset.id = id;
        const modal = document.querySelector('#modal');
        modal.showModal();
        const inputName = document.querySelector('#editName');
        const inputPhone = document.querySelector('#editPhone');
        const inputEmail = document.querySelector('#editEmail');

        for(let e of this.contactos) {
            if(e.id == id) {
                inputName.value = e.name;
                inputPhone.value = e.phone;
                inputEmail.value = e.email;
                break;
            }
        }
    }
    messageAdd(back, message) {
        const span = document.querySelector('.message-confirm');
        span.innerHTML = message;
        span.style.background = back;
        span.style.display = 'block';

        setTimeout(() => {
            span.style.display = 'none';
        }, 1000)
    }
}
const user = new User();
function selectData() {
    const email = document.querySelector('#valueEmail').value;
    const name = document.querySelector('#valueName').value;
    const phone = document.querySelector('#valuePhone').value;
    if(email.includes('@')) {
        const contacto = new Contact(name, phone, email, id);
        
        user.addContact(contacto);
        
        id += 1;
        document.querySelector('.form-add').reset();
        user.messageAdd('orange', 'Contacto Agregado')
    } else {
        alert('Completa los datos correctamente')
    }
}

function loadContact() {
    const vista = document.querySelector('.contacts-load');
    const addContacto = document.querySelector('.add-contacto');
    addContacto.style.display = 'none';
    vista.style.display = 'block';
    user.loadContacts();
}

function search() {
    const valueSearch = document.querySelector('#valueSearch').value;
    user.searchContact(valueSearch);
}

function viewSection() {
    const vista = document.querySelector('.contacts-load');
    const addContacto = document.querySelector('.add-contacto');
    vista.style.display = 'none';
    addContacto.style.display = 'block';
}
function saveChange() {
    user.sendChange();
}

document.querySelector('.contacts__content').addEventListener('click', (e) => {
    if(e.target.id == 'button__delete') {
        const but = e.target;
        user.deleteContact(but);
        user.messageAdd('red', 'Contacto eliminado')
        console.log('delete')
    } else if(e.target.id == 'button__edit') {
        const pa = e.target.parentElement.parentElement.id;
        user.updateContact(pa)
    }
    
})

document.querySelector('#close-modal').addEventListener('click', ()=> {
    const modal = document.querySelector('#modal');
    modal.close();
})
// document.querySelector('#button__send').addEventListener('click', )