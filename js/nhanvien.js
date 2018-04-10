/* 
Muc tieu: tao ra lop, prototype nhan vien
nguoi tao: Khoa Phung
ngay tao: april 7 18
*/

function NhanVien(maSoNhanVien, fname, lname, ngayLam, chucVu,
    soNgayLamViec) {
    //thuoc tinh cua class NhanVien
    this.maSoNhanVien = maSoNhanVien;
    this.fname = fname;
    this.lname = lname;
    this.ngayLam = ngayLam;
    this.chucVu = chucVu;
    this.soNgayLamViec = soNgayLamViec;
    //cach1
    // //phuong thuc cua prototype NhanVien
    // this.tinhLuong = function () {
    //     return soNgayLamViec*luongCoBan + phuCap;
    // };
    this.mangThuocTinh = [
        this.maSoNhanVien,
        this.fname,
        this.lname,
        this.ngayLam,
        this.chucVu,
        this.soNgayLamViec,
    ]

    this.soThuocTinh = function() {
        return this.mangThuocTinh.length;
    }

}
//cach2
NhanVien.prototype.tinhLuong = function() {
    return soNgayLamViec * luongCoBan + phuCap;
}