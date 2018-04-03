/*
created by: Khoa Phung
date: april/3/18
ver: 1.0
*/


//helper function
function getMyEle(id) {
    return document.getElementById(id);
}

//array that's stored the warning string
var warningArray = [
    "Bạn chưa nhập họ kìa!",
    "Bạn chưa nhập tên kìa!",
    "Bạn chưa nhập MSNV kìa!",
    "Bạn chưa chọn chức vụ kìa!",
    "Bạn chỉ được nhập vào ký tự là chữ",
    "Bạn chỉ được nhập vào ký tự là số",
    "Chuỗi giới hạn từ 5 đến 10 ký tự là số"
];

function isEmpty(fieldId, validationId, warningArrayIndex) {
    var fieldValue = getMyEle(fieldId).value;
    var validationView = getMyEle(validationId);
    if (fieldValue === "") {
        validationView.innerHTML = warningArray[warningArrayIndex];
        return true;
    } else {
        validationView.innerHTML = "";
        return false;
    }

}

function isSelected(selectId, validationId) {
    var selectValue = getMyEle(selectId);
    var validationView = getMyEle(validationId);
    if (selectValue.selectedIndex == 0) {
        validationView.innerHTML = warningArray[3];
        return false;
    } else {
        validationView.innerHTML = "";
        return true;
    }
}

function isAlpha(fieldId, validationId) {
    var characterArray = /^[A-Za-z]+$/;
    var fieldValue = getMyEle(fieldId).value;
    var validationView = getMyEle(validationId);
    if (fieldValue.match(characterArray)) {
        validationView.innerHTML = "";
    } else {
        validationView.innerHTML = warningArray[4];
    }
}

function isNumber(fieldId, validationId) {
    var characterArray = /^-{0,1}\d+$/;
    var fieldValue = getMyEle(fieldId).value;
    var validationView = getMyEle(validationId);
    if (fieldValue.match(characterArray)) {
        validationView.innerHTML = "";
        return true;
    } else {
        validationView.innerHTML = warningArray[5];
        return false;
    }
}

function checkLength(fieldId, validationId) {
    var fieldValue = getMyEle(fieldId).value;
    var fieldLength = fieldValue.length;
    var validationView = getMyEle(validationId);
    if (fieldLength < 5 || fieldLength > 10) {
        validationView.innerHTML = warningArray[6];
    } else {
        validationView.innerHTML = "";
    }
}


//assign trigger funtion to add-employee-btn

getMyEle("add-employee-btn").addEventListener("click", function() {
    var emptyFname = isEmpty("fname-field", "fname-validation", 0);
    // if the field is not empty then check the characters.
    if (emptyFname === false) {
        isAlpha("fname-field", "fname-validation");
    }
    var emptyLname = isEmpty("lname-field", "lname-validation", 1);
    if (emptyLname === false) {
        isAlpha("lname-field", "lname-validation");
    }
    var emptyNumber = isEmpty("id-num-field", "id-number-validation", 2);
    if (emptyNumber === false) {
        var isANumber = isNumber("id-num-field", "id-number-validation");
        if (isANumber) {
            checkLength("id-num-field", "id-number-validation");
        }
    }


    var emptySelect = isSelected("role-field", "role-validation");

});