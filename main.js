const userId = document.querySelector('#_id');
const userName = document.querySelector('#name');
const userEmail = document.querySelector('#email');
const userPhone = document.querySelector('#phone');
const btn = document.querySelector('.btn');
const list = document.querySelector('.items');

btn.addEventListener('click', addAppointment);
window.addEventListener('DOMContentLoaded', getAppointsments);
list.addEventListener('click', deleteAppointment);
list.addEventListener('click', updateAppointment);

function getAppointsments() {
    axios
        .get('https://crudcrud.com/api/619ac7aaab834d0c98d4848af43bd9d2/appointments')
        .then(response => {
            response.data.forEach(element => {
                let output = `<li class="list-group-item d-flex justify-content-between align-items-center" id="${element._id}">
                                <span>${element.name} - ${element.email} - ${element.phone}</span>
                                <div>
                                    <button type="submit" class="btn btn-info edit">Edit</button>
                                    <button type="submit" class="btn btn-danger delete">Delete</button>
                                </div>
                            </li>`;
                list.innerHTML += output;
            });
        })
        .catch(err => console.error(err));
}

function addAppointment(e) {
    e.preventDefault();
    const id = userId.value;
    const name = userName.value;
    const email = userEmail.value;
    const phone = userPhone.value;
    let user = {
        "name": name,
        "email": email,
        "phone": phone,
    };
    if (id) {
        axios
            .put(`https://crudcrud.com/api/619ac7aaab834d0c98d4848af43bd9d2/appointments/${id}`, user)
            .then(res => window.location.reload())
            .catch(err => console.error(err));
    }
    if (!id && name && email && phone) {
        axios
            .post('https://crudcrud.com/api/619ac7aaab834d0c98d4848af43bd9d2/appointments', user)
            .then(response => {
                let output = `<li class="list-group-item d-flex justify-content-between align-items-center" id="${response.data._id}">
                                <span>${response.data.name} - ${response.data.email} - ${response.data.phone}</span>
                                <div>
                                    <button type="submit" class="btn btn-info edit">Edit</button>
                                    <button type="submit" class="btn btn-danger delete">Delete</button>
                                </div>
                            </li>`;

                list.innerHTML = output;
            })
            .catch(err => console.error(err));
        userName.value = '';
        userEmail.value = '';
        userPhone.value = '';
    }
}

function deleteAppointment(e) {
    if (e.target.classList.contains('delete')) {
        const item = e.target.parentElement.parentElement;
        const id = item.getAttribute('id');
        axios
            .delete(`https://crudcrud.com/api/619ac7aaab834d0c98d4848af43bd9d2/appointments/${id}`)
            .then(response => {
                item.remove();
            })
            .catch(err => console.error(err));
    }
}

function updateAppointment(e) {
    if (e.target.classList.contains('edit')) {
        const item = e.target.parentElement.parentElement;
        const id = item.getAttribute('id');
        axios
            .get(`https://crudcrud.com/api/619ac7aaab834d0c98d4848af43bd9d2/appointments/${id}`)
            .then(res => {
                userId.value = res.data._id;
                userName.value = res.data.name;
                userEmail.value = res.data.email;
                userPhone.value = res.data.phone;
            })
            .catch(err => console.error(err));
    }
}