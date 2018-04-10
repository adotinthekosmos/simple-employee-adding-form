/*
Muc tieu: tao ra lop, prototype DanhSachNhanVien
nguoi tao: Khoa Phung
ngay tao: april 7 18
*/
function DanhSachNhanVien() {
    this.danhSachNV = [];
}

DanhSachNhanVien.prototype.themNhanVien = function(nv) {
    this.danhSachNV.push(nv);
}

DanhSachNhanVien.prototype.xuatLuong = function() {
    var soNhanVien = this.danhSachNV.length;
    for (var i = 0; i < soNhanVien; i++) {
        this.danhSachNV[i].tinhLuong();
    }
};

//ham tim va tra ve index nhan vien trong danh sach nhan vien
DanhSachNhanVien.prototype.timIndexNhanVien = function(maNhanVien) {
    var indexFound = -1;
    for (i = 0; i < this.danhSachNV.length; i++) {
        if (this.danhSachNV[i].maSoNhanVien == maNhanVien) {
            indexFound = i;
            break;
        }
    }
    return indexFound;
}

//ham tim va tra ve nhanVien
DanhSachNhanVien.prototype.timNhanVien = function(maNhanVien) {
    var nhanVien = null;
    for (i = 0; i < this.danhSachNV.length; i++) {
        if (this.danhSachNV[i].maSoNhanVien == maNhanVien) {
            nhanVien = this.danhSachNV[i];
        }
    }
    return nhanVien;
}


DanhSachNhanVien.prototype.xoaNhanVien = function(maNhanVien) {
    var indexNhanVien = this.timIndexNhanVien(maNhanVien);
    if (indexNhanVien >= 0) {
        this.danhSachNV.splice(indexNhanVien, 1);
    }
}

DanhSachNhanVien.prototype.timTheoTen = function(ten) {
    return "";
}

DanhSachNhanVien.prototype.soLuongNhanVien = function() {
    return this.danhSachNV.length;
}