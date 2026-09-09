
const list_container = document.querySelector('.list_container');
const add_button = document.querySelector('.input_section .add_button');


const date_class = document.querySelector('.input_section .user_date_input');
const today = new Date().toISOString().split('T')[0];
date_class.min = today;


console.log(date_class.value);




/*
========================   sorting priority ===========================
*/



const user_priority_option=document.querySelector('.user_priority_option');

const sorted_priority_button=document.querySelector('.sort_priority');

sorted_priority_button.addEventListener('click',function(event){
    const task_arr=[...list_container.querySelectorAll('li')];

    if(sorted_priority_button.value=='hight_to_low')
    {
        task_arr.sort(function(a,b)
        {

            const p1=a.querySelector('.priorityValue').innerHTML;
            const p2=b.querySelector('.priorityValue').innerHTML;

            const order={
                high:1,
                mid:2,
                low:3,
            }

            return order[p1]-order[p2];

        })



        task_arr.forEach(function(ta)
        {
            list_container.append(ta);
        })

    }
    else if(sorted_priority_button.value=='low_to_high')
    {


        task_arr.sort(function(a,b)
        {

            const p1=a.querySelector('.priorityValue').innerHTML;
            const p2=b.querySelector('.priorityValue').innerHTML;

            const order={
                high:1,
                mid:2,
                low:3,
            }

            return order[p2]-order[p1];

        })



        task_arr.forEach(function(ta)
         {
            list_container.append(ta);
        })


    }

user_priority_option.value="";


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




