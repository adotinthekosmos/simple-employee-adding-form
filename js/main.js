/*
created by: Khoa Phung
date: april/3/18
ver: 1.0
*/


//helper function
function getMyEle(id) {
    return document.getElementById(id);
}


// bien toan cuc luu tru toan bo du lieu
var dsNhanVien = new DanhSachNhanVien();
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
        return true;
    } else {
        validationView.innerHTML = warningArray[4];
        return false;
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
        return false;
    } else {
        validationView.innerHTML = "";
        return true;
    }
}





function checkValidate() {
    var result = false;
    var emptyFname = isEmpty("fname-field", "fname-validation", 0);
    // if the field is not empty then check the characters.
    if (emptyFname === false) {
        result = isAlpha("fname-field", "fname-validation");
        if (result === false) {
            return result;
        }
    }
    // if the field is not empty then check the characters.
    var emptyLname = isEmpty("lname-field", "lname-validation", 1);
    if (emptyLname === false) {
        result = isAlpha("lname-field", "lname-validation");
        if (result === false) {
            return result;
        }
    }
    // if the field is not empty then check the characters.
    var emptyNumber = isEmpty("id-num-field", "id-number-validation", 2);
    if (emptyNumber === false) {
        result = isNumber("id-num-field", "id-number-validation");
        // if the field is an number then check the length.
        if (result) {
            result = checkLength("id-num-field", "id-number-validation");
        } else {
            return result;
        }
    }
    //check whether the selectBox is selected or not
    result = isSelected("role-field", "role-validation");
    return result;
}

//when the add button is clicked, we clear the form for the next adding event
function renewForm() {
    getMyEle('fname-field').value = '';
    getMyEle('lname-field').value = '';
    getMyEle('id-num-field').value = '';
    getMyEle('role-field').selectedIndex = 0;
}

//create new row
function createRow(nhanVien, tBody) {
    var row = document.createElement('tr');
    tBody.appendChild(row);
    for (var i = 0; i < nhanVien.mangThuocTinh.length; i++) {
        var col = document.createElement('td');
        col.innerHTML = nhanVien.mangThuocTinh[i];
        row.appendChild(col);
    }
    var btnGroup = document.createElement("td");
    var btnSua = "<button class='btn btn-warning' id='sua_" + nhanVien.maSoNhanVien + "'><i class='fa fa-pencil-square-o'></i></button>";
    var btnXoa = "<button class='btn btn-danger mr-2' id='xoa_" + nhanVien.maSoNhanVien + "'><i class='fa fa-trash-o'></i></button>";
    var btnCapNhat = "<button class='btn btn-success btn-hidden' id='capnhat_" + nhanVien.maSoNhanVien + "'><i class='fa fa-floppy-o'></i></button>";
    btnGroup.innerHTML = btnXoa + btnCapNhat + btnSua;
    row.appendChild(btnGroup);
    deleteHandler("xoa_" + nhanVien.maSoNhanVien);
    editHandler("sua_" + nhanVien.maSoNhanVien);
    saveHandler("capnhat_" + nhanVien.maSoNhanVien);
}

//handler for delete btn
function deleteHandler(eleID) {
    getMyEle(eleID).addEventListener("click", function() {
        this.style.display = "block";
        var id = this.id;
        //create an array to store id of current btn and then split the string 
        //to get the maNhanVien to match maNhanVien in dsNhanVien array
        var mangTemp = id.split("_");
        dsNhanVien.xoaNhanVien(mangTemp[1]);
        Render();
    });
}

//handler for edit btn
function editHandler(eleID) {
    getMyEle(eleID).addEventListener("click", function() {
        this.style.display = "block";
        var myTable = getMyEle('table-display');
        var id = this.id;
        var mangTemp = id.split("_");
        //lay nhan vien de tiep theo fill vao text field
        var currentNhanVien = dsNhanVien.timNhanVien(mangTemp[1]);
        //tim vi tri cua row
        var currentRowindex = this.parentNode.parentNode.rowIndex;
        //loop through the row to replace the text field
        var soThuocTinh = currentNhanVien.soThuocTinh();
        for (var i = 0; i < soThuocTinh; i++) {
            var editTextBox = "<input type='text' class='form-control' value='" + currentNhanVien.mangThuocTinh[i] + "'>";
            myTable.rows[currentRowindex].cells[i].innerHTML = editTextBox;
        }
        //when the button is clicked, hide the delete and edit button
        this.style.display = "none";
        getMyEle('xoa_' + currentNhanVien.maSoNhanVien).style.display = "none";
        //display the saveBtn
        getMyEle('capnhat_' + currentNhanVien.maSoNhanVien).style.display = "block"
    });
}

//handler for save btn
function saveHandler(eleID) {
    getMyEle(eleID).addEventListener("click", function() {
        var myTable = getMyEle('table-display');
        var id = this.id;
        var mangTemp = id.split("_");
        //find nhan vien to fill in textView
        var currentNhanVien = dsNhanVien.timNhanVien(mangTemp[1]);
        //get the index of the current row
        var currentRowindex = this.parentNode.parentNode.rowIndex;
        //loop through the table row to assign the correct cells values to currentNhanVien
        var soThuocTinh = currentNhanVien.soThuocTinh();
        for (var i = 0; i < soThuocTinh; i++) {
            var currentTextBoxValue = myTable.rows[currentRowindex].cells[i].children[0].value;
            currentNhanVien.mangThuocTinh[i] = currentTextBoxValue;
        }
        //when saveBtn is clicked, hide the btn
        this.style.display = "none";
        Render();
    });
}

//refresh and display the table
function Render() {
    var tBody = getMyEle('tBody');
    //clear the body to prevent cells duplication
    tBody.innerHTML = "";
    //loop through dsNhanVien to take data from array and display to table
    var soNhanVien = dsNhanVien.soLuongNhanVien();
    for (var i = 0; i < soNhanVien; i++) {
        var nhanVien = dsNhanVien.danhSachNV[i];
        createRow(nhanVien, tBody);
    }

}


//themNhanVien Button event
getMyEle("add-employee-btn").addEventListener("click", function() {
    var result = checkValidate();
    if (result) {
        var ho = getMyEle('fname-field').value;
        var ten = getMyEle('lname-field').value;
        var maNV = getMyEle('id-num-field').value;
        var ngayLam = getMyEle('datepicker').value;
        var chucVu = getMyEle('role-field').value;
        var nhanVien = new NhanVien(maNV, ho, ten, ngayLam, chucVu);
        dsNhanVien.themNhanVien(nhanVien);
        renewForm();
        //hide the warning when the button is clicked
        var bangThongBao = getMyEle('bang-thong-bao');
        bangThongBao.style.display = "none";
        //display the table when the button is clicked
        var myTable = getMyEle('table-display');
        myTable.style.display = "table";
    }
    Render();
});