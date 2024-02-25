let uid_dom = document.querySelector('#uid');
console.log(uid_dom);

uid_dom.innerHTML = 'UID update from javascript.';
uid_dom.style.color = 'blue';

let dom_students = document.querySelectorAll('.student');
console.log(dom_students);

dom_students[0].style.color = 'red';