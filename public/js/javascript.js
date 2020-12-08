function init() {
    displayAllExpenses();
    document.querySelector(".btn-add").addEventListener("click", addExpense)
    document.querySelector(".btn-update").addEventListener("click", updateExpense)
    document.addEventListener('click', event => {
        if (event.target.classList.contains('btn-delete')) {
            deleteExpense(event);
        } else if (event.target.classList.contains('btn-edit')) {
            showEditForm(event);
        }
    })
}

function displayAllExpenses() {
    axios.get('http://localhost:3000/expense/')
        .then(res => {
            res = res.data.expenses;
            const container = document.querySelector(".list-container");
            res.forEach( item => {
                const eachrow = "<div class='row text-center'>" +
                                "<div class='col-md-1'>" + item.expense.type + "</div>" +
                                "<div class='col-md-2'>" + item.expense.amount + "</div>" + 
                                "<div class='col-md-2'>" + item.expense.date + "</div>" + 
                                "<div class='col-md-2'>" + item.expense.category + "</div>" + 
                                "<div class='col-md-2'>" + item.expense.memo + "</div>" +
                                "<div class='col-md-3'>" + "<a  class='m-1 btn-edit' data-id=" + item.expense._id + ">Edit</a>" +
                                "<a class='m-1 btn-delete' data-id=" + item.expense._id + ">Delete</a></div>"
                container.innerHTML += eachrow;
            });
        })
        .catch(error => {
            console.log(error);
        })
}

function showAddForm() {
    showForm("Add Expense");
}

function showEditForm(event) {
    showForm("Update Expense");
    const id = event.target.getAttribute('data-id');
    document.querySelector(".btn-update").setAttribute('data-id', id);
    axios.get(`http://localhost:3000/expense/${id}`)
        .then(res => {
           const expense = res.data.expense;
            document.querySelector("#type").value = expense.type;
            document.querySelector("#amount").value = expense.amount;
            document.querySelector("#date").value = expense.date;
            document.querySelector("#category").value = expense.category;
            document.querySelector("#memo").value = expense.memo;
        })
        .catch(error => {
            console.log(error);
        })
}

function addExpense() {
    const type = document.querySelector("#type").value;
    const amount = document.querySelector("#amount").value;
    const date = document.querySelector("#date").value;
    const category = document.querySelector("#category").value;
    const memo = document.querySelector("#memo").value;
    const newExpense = {
        type: type,
        date: date,
        amount: amount,
        category: category,
        memo: memo
    }
    axios.post('http://localhost:3000/expense/add', newExpense)
        .then (res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    document.querySelector(".expense-form").reset();
    init();

}

function updateExpense(event) {
    const id = event.target.getAttribute('data-id');
    const type = document.querySelector("#type").value;
    const amount = document.querySelector("#amount").value;
    const date = document.querySelector("#date").value;
    const category = document.querySelector("#category").value;
    const memo = document.querySelector("#memo").value;
    const updateExpense = [{propName: "type", value: type}, {propName: "amount", value: amount}, {propName: "date", value: date}, {propName: "category", value: category}, {propName: "memo", value: memo}];
    axios.patch(`http://localhost:3000/expense/edit/${id}`, updateExpense)
        .then (res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    document.querySelector(".expense-form").reset();
    init();
}

function deleteExpense(event) {
    const id = event.target.getAttribute('data-id');
    axios.delete(`http://localhost:3000/expense/delete/${id}`)
        .then(res=> {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    // Delete DOM elements
    const parent = event.target.parentElement.parentElement;
    parent.innerHTML = '';

}

function showForm(title) {
    document.querySelector(".form-title").innerHTML = title;
    document.querySelector(".form-container").classList.remove('hide');
    document.querySelector(".form-container").classList.add('show');
    if (title == "Add Expense") {
        document.querySelector(".btn-update").classList.remove('show');
        document.querySelector(".btn-update").classList.add('hide');
        document.querySelector(".btn-add").classList.remove('hide');
        document.querySelector(".btn-add").classList.add('show');
    } else if (title =="Update Expense") {
        document.querySelector(".btn-add").classList.remove('show');
        document.querySelector(".btn-add").classList.add('hide');
        document.querySelector(".btn-update").classList.remove('hide');
        document.querySelector(".btn-update").classList.add('show');
    }
}