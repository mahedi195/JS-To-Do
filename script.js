
const list_container = document.querySelector('.list_container');
const add_button = document.querySelector('.input_section .add_button');


const date_class = document.querySelector('.input_section .user_date_input');
const today = new Date().toISOString().split('T')[0];
date_class.min = today;


console.log(date_class.value);




/*
========================   sorting priority ===========================
*/

const sort_priority_class = document.querySelector('.sort_priority');
sort_priority_class.addEventListener('click', function (event) {

    const task_arr = [...list_container.querySelectorAll('li')];

    if (sort_priority_class.value == 'hight_to_low') {
        task_arr.sort(function (a, b) {
            const priorityA = a.querySelector('.priorityValue').innerHTML;
            const priorityB = b.querySelector('.priorityValue').innerHTML;
            const order = {
                high: 1,
                mid: 2,
                low: 3
            }

            return order[priorityA] - order[priorityB];
        })


        task_arr.forEach(function (new_list) {
            list_container.append(new_list);
        })



    }
    else if (sort_priority_class.value == 'low_to_high') {
        task_arr.sort(function (a, b) {
            const priorityA = a.querySelector('.priorityValue').innerHTML;
            const priorityB = b.querySelector('.priorityValue').innerHTML;
            const order = {
                high: 1,
                mid: 2,
                low: 3
            }

            return order[priorityB] - order[priorityA];
        })


        task_arr.forEach(function (new_list) {
            list_container.append(new_list);
        })



    }


    sort_priority_class.value = "";


})




/*
=================search task ============================

*/

const search_task_class = document.querySelector('.search_task');
search_task_class.addEventListener('input', function (event) {

    let seach_text = search_task_class.value;
    seach_text = seach_text.toLowerCase();

    const task_arr = [...list_container.querySelectorAll('li')];

    task_arr.forEach(function (i_th_list) {

        let i_th_task = i_th_list.querySelector('.task').innerHTML;
        i_th_task = i_th_task.toLowerCase();

        if (i_th_task.includes(seach_text))
            i_th_list.style.display = 'flex';

        else
            i_th_list.style.display = 'none';




    })

})




















add_button.addEventListener('click', function (event) {

    const list = document.createElement('li');


    //task input  section
    const task_class = document.querySelector('.input_section .user_task_input');
    const user_task_input = task_class.value;
    if (user_task_input == '') {
        alert('You have to add a task');
        return;
    }

    const span_task = document.createElement('span');
    span_task.className = 'task';
    span_task.innerHTML = user_task_input;

    list.append(span_task);




    //date input section

    const user_date_input = date_class.value;


    if (user_date_input == '') {
        alert('You have to add a date');
        return;
    }

    console.log('W------------');
    console.log(user_date_input);

    const date_object = new Date(user_date_input + 'T00:00:00');
    const date_format = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }
    const user_date = date_object.toLocaleDateString('en-GB', date_format);
    console.log(user_date);


    const span_date = document.createElement('span');
    span_date.className = 'date';
    span_date.innerHTML = user_date;

    list.append(span_date);




    //priority input section

    const priority_class = document.querySelector('.input_section .user_priority_option');
    const user_priority_input = priority_class.value;
    if (user_priority_input == '') {
        alert('You have to add a priority');
        return;
    }

    const span_priority = document.createElement('span');
    span_priority.className = 'priorityValue';
    span_priority.innerHTML = user_priority_input;

    if (priority_class.value == 'High')
        span_priority.classList.add('highh');
    else if (priority_class.value == 'Mid')
        span_priority.classList.add('midd');
    else if (priority_class.value == 'Low')
        span_priority.classList.add('loww');


    list.append(span_priority);



    //date input section
    const span_delete = document.createElement('span');
    span_delete.className = 'delete';
    span_delete.innerHTML = '\u00d7';
    list.append(span_delete);



    //adding to list
    list_container.prepend(list);


    task_class.value = "";
    date_class.value = "";
    priority_class.value = "";


    saveTask();
})




/*
const list_container=document.querySelector('.list_container');
*/

list_container.addEventListener('click', function (event) {

    if (event.target.tagName == 'LI') {
        event.target.classList.toggle('checked');
        if (event.target.classList.contains('checked'))
            list_container.append(event.target);
        else list_container.prepend(event.target);
    }

    else if (event.target.classList.contains('delete'))
        event.target.parentElement.remove();


    saveTask();
})




const delete_all = document.querySelector('.delete_all');

delete_all.addEventListener('click', function (event) {
    list_container.innerHTML = "";
    saveTask();
})
























































function saveTask() {
    localStorage.setItem('abcd', list_container.innerHTML);
}

function getTask() {
    const retrive_task = localStorage.getItem('abcd');
    if (retrive_task != null) {
        list_container.innerHTML = retrive_task;
    }
}

getTask();




