
const list_container = document.querySelector('.list_container');
const add_button = document.querySelector('.input_section .add_button');


const date_class = document.querySelector('.input_section .user_date_input');
const today = new Date().toISOString().split('T')[0];
date_class.min = today;


console.log(date_class.value);





/*

====================           progress section        =======================================================

*/

function update_progress()
{
const progress_line = document.querySelector('.progress_line');
const pregress_count_and_circle = document.querySelector('.pregress_count_and_circle ');


const total_task = list_container.querySelectorAll('li').length;
const completed_task = list_container.querySelectorAll(' li.checked').length;
let percentage = 0;
if (total_task > 0)
    percentage = (completed_task / total_task) * 100;
progress_line.style.width = percentage + '%';
pregress_count_and_circle.querySelector(' p').innerHTML = completed_task + '/' + total_task;

}









/* 

=================   task addition ==========================

*/


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
    no_task_message();

    update_progress();
})











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
                High: 1,
                Mid: 2,
                Low: 3
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
                High: 1,
                Mid: 2,
                Low: 3
            }

            return order[priorityB] - order[priorityA];
        })


        task_arr.forEach(function (new_list) {
            list_container.append(new_list);
        })



    }


    sort_priority_class.value = "";


})















/*???????????>>>>>>>>>.

=====================  sort by date =================

*/


const sort_by_date_class = document.querySelector('.sort_by_date');

sort_by_date_class.addEventListener('click', function (event) {

    const task_arr = [...list_container.querySelectorAll('li')];
    if (sort_by_date_class.value == 'earliest_to_latest') {
        task_arr.sort(function (a, b) {

            const date1 = a.querySelector('.date').innerHTML;
            const date2 = b.querySelector('.date').innerHTML;


            return new Date(date1) - new Date(date2);


        })

        task_arr.forEach(function (row) {
            list_container.append(row);
        })
    }
    else if (sort_by_date_class.value == 'latest_to_earliest') {

        task_arr.sort(function (a, b) {

            const date1 = a.querySelector('.date').innerHTML;
            const date2 = b.querySelector('.date').innerHTML;


            return new Date(date2) - new Date(date1);


        })

        task_arr.forEach(function (row) {
            list_container.append(row);
        })


    }


})






/*
=================search task ============================

*/
const no_task_matched = document.querySelector('.no_task');
const search_task_class = document.querySelector('.search_task');
search_task_class.addEventListener('input', function (event) {

    let seach_text = search_task_class.value;
    seach_text = seach_text.toLowerCase();

    const task_arr = [...list_container.querySelectorAll('li')];

    let matched_taks = 0;

    task_arr.forEach(function (i_th_list) {

        let i_th_task = i_th_list.querySelector('.task').innerHTML;
        i_th_task = i_th_task.toLowerCase();

        if (i_th_task.includes(seach_text)) {
            i_th_list.style.display = 'flex';
            matched_taks++;
        }
        else
            i_th_list.style.display = 'none';


    })

    if (matched_taks == 0) //document.querySelector('.no_task').style.display = 'flex';
        no_task_matched.style.display = 'flex';

    else //document.querySelector('.no_task').style.display = 'none';
        no_task_matched.style.display = 'none';


})




/*
 ==============  task row- check, uncheck toggle
                 delete single row(task)

*/

list_container.addEventListener('click', function (event) {

    if (event.target.tagName == 'LI') {
        event.target.classList.toggle('checked');
        if (event.target.classList.contains('checked'))
            list_container.append(event.target);
        else
            list_container.prepend(event.target);

    }
    else if (event.target.classList.contains('delete')) {

        const delete_task = confirm('Are you sure to delete this task ? ');

        if (delete_task)
            event.target.parentElement.remove();

    }


    saveTask();
    no_task_message();
    update_progress();
})





/* =========================

                              Delete all

===================================== */

const delete_all = document.querySelector('.delete_all');

delete_all.addEventListener('click', function (event) {

    const all_task_delete = confirm('Are you sure to delete all task ? ');

    if (all_task_delete)
        list_container.innerHTML = "";

    saveTask();
    no_task_message();
    update_progress();
})





/*    empty state message ********  =============  */

function no_task_message() {
    const no_taks_class = document.querySelector('.no_task');
    const total_taks = list_container.querySelectorAll('li').length;
    if (total_taks == 0)
        no_taks_class.style.display = 'flex';
    else no_taks_class.style.display = 'none';

}




/*
=========================== dark mode  ============================ 
*/


const dark_button_class = document.querySelector('.dark_mode_image');
console.log(dark_button_class);
const dark_image = document.querySelector('.dark_mode_image img');

dark_button_class.addEventListener('click', function () {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark'))
        dark_image.src = "images/sun.avif";
    else
        dark_image.src = "images/moon.jpg";


})






/* 
=================  save task ==============================


*/


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
no_task_message();
update_progress();


