"use strict"
const pers = [
    {
        name: 'Thuan',
        age: 20,
        gender : 'male',
        point : 8
    },
    {
        name: 'Thu',
        age: 18,
        gender : 'fmale',
        point : 7
    },
    {
        name: 'Thanh',
        age: 17,
        gender : 'male',
        point : 10
    },
    {
        name: 'Huy',
        age: 16,
        gender : 'fmale',
        point : 5
    }
];

// init 
function init(){
    select();
    render(pers);
    filterGender();
    filterAge();
    filterName();
    sub(pers);
    addClassCreate();
    removeClassCreate();
    createPer();
    updatePer();
    deletePer();
}

// render table
function render(pers){
    let per_table = pers.map( (per,key) => `<tr><td> ${key+1} </td><td> ${per.name} </td><td> ${per.age} </td><td> ${per.gender} </td><td> ${per.point} </td><td><from> <button class="edit" value="${key}">Sửa</button> <button class="delete" value="${key}">Xoá</button></from></td></tr>` );
    let per_html = per_table.join("");
    document.getElementById('table').innerHTML  = per_html;
    deletePer();
}

// add class show
function addClassShow(addclass){
    return document.querySelector('.' + addclass).classList.add('show');
}
//remove class show
function removeClassShow(removeclass){
    return document.querySelector('.' + removeclass).classList.remove('show');
}

function addClassCreate(){
    document.getElementById('create').addEventListener('click', addCreateShow);
    let updates = document.getElementsByClassName('edit');
    let updateArray = Array.prototype.slice.call(updates);
    updateArray.forEach(element => {
        element.addEventListener('click', addCreateShow);
    });
    function addCreateShow(){
        event.preventDefault();
        addClassShow('create');
        addClassShow('bg');
    }
}

function removeClassCreate(){
    document.querySelector('.bg').onclick = (event) => {
        removeClassShow('create');
        removeClassShow('bg');
    }
}

// Create Per
function createPer(){
    document.getElementById('create-per').onclick = (event) => {
        event.preventDefault();
        let perName = document.querySelector('.create .name').value;
        let perAge = document.querySelector('.create .age').value;
        let perGender = document.querySelector('.create .gender').value;
        let perPoint = document.querySelector('.create .point').value;
        let per = {
            name: perName,
            age: parseInt(perAge),
            gender : perGender,
            point : parseInt(perPoint)
        };
        pers.push(per);
        removeClassShow('create');
        removeClassShow('bg');
        render(pers);
        sub(pers);
    }
}

// Edit Per

function updatePer(){
    let updates = document.getElementsByClassName('edit');
    let updateArray = Array.prototype.slice.call(updates);
    updateArray.forEach(element => {
        element.onclick = function() {
            let keyDelete = element.value;
            let perName = document.querySelector('.create .name');
            perName.value = pers[element.value].name;
            let perAge = document.querySelector('.create .age');
            perAge.value = pers[element.value].age;
            let perGender = document.querySelector('.create .gender');
            perGender.value = pers[element.value].gender;
            let perPoint = document.querySelector('.create .point');
            perPoint.value = pers[element.value].point;
            document.getElementById('create-per').innerHTML = 'Cập Nhật';
            // pers.splice(parseInt(keyDelete),1);
            // render(pers);
            // sub(pers);
        }
    });
}

// Delete Per
function deletePer(){
    let deletes = document.getElementsByClassName('delete');
    let deleteArray = Array.prototype.slice.call(deletes);
    deleteArray.forEach(element => {
        element.onclick = function() {
            // element.classList.add('df');
            let keyDelete = element.value;
            pers.splice(parseInt(keyDelete),1);
            render(pers);
            sub(pers);
        }
    });
}

// Filter Gender
function filterGender(){
    let requestFilter = document.getElementById('selectGender');
    requestFilter.onchange = () => {
        let filterValue = requestFilter.value;
        let filterGenders = pers.filter( (per) =>{
            if(filterValue == 'all'){
                return true;
            }else{
                return per.gender == filterValue;
            }
        });
        render(filterGenders);
        sub(filterGenders);
    }
}

    // Filter Name
function filterName(){
    let requestFilter = document.getElementById('selectName');
    requestFilter.oninput = () => {
        setTimeout( () =>{
            let filterValue = requestFilter.value;
            let filterNames = pers.filter( (per) =>{
                let n = per.name.indexOf(filterValue);
                return n >= 0;
            });
            render(filterNames);
            sub(filterNames);
        },1000);
    }
}

// Filter Age
function filterAge(){
    let requestFilter = document.getElementById('selectAge');
    requestFilter.onchange = () => {
        let filterValue = requestFilter.value;
        let filterAges = pers.filter( (per) =>{
            if(filterValue == 'all'){
                return true;
            }else if(filterValue == 1){
                return per.age >= 18;
            }else{
                return per.age < 18;
            }
        });   
        render(filterAges);
        sub(filterAges);
    }
}

// Sub Table
function sub(subs){
    let pointArray = subs.map( (per) => per.point) ;
    let sub = pointArray.reduce((x,y) => {
        return x+y;
    },0);
    document.getElementById('point').innerHTML = `Tổng Point là: ${sub}`;        
}

// option filter
function select(){
    let requestSelecter = document.getElementById('select');
    requestSelecter.onchange = () => {
        render(pers);
        let selectValue = requestSelecter.value;
        switch(selectValue){
            case 'name':
                document.getElementById('selectName').classList.remove('hide');
                document.getElementById('selectGender').className = 'hide';
                document.getElementById('selectAge').className = 'hide';
                break;
            case 'gender':
                document.getElementById('selectGender').classList.remove('hide');
                document.getElementById('selectName').className = 'hide';
                document.getElementById('selectAge').className = 'hide';
                break;
            case 'age':
                document.getElementById('selectAge').classList.remove('hide');
                document.getElementById('selectGender').className = 'hide';
                document.getElementById('selectName').className = 'hide';
                break;
        }
    }
}

init();