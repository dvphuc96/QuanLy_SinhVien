import React, { Component } from "react";
import TableSinhVien from "./TableSinhVien";

export default class QuanLySinhVien extends Component {
  state = {
    formValue: {
      maSV: "",
      tenSV: "",
      soDienThoai: "",
      email: "",
    },
    formError: {
      maSV: "",
      tenSV: "",
      soDienThoai: "",
      email: "",
    },
    valid: false,
    isDisable: false,
    arrSinhVien: [
      {
        maSV: 1,
        tenSV: "Do Van Phuc",
        soDienThoai: "0396244169",
        email: "phuc.dovan.96@gmail.com",
      },
      {
        maSV: 2,
        tenSV: "Ho Duy Quang",
        soDienThoai: "0357661024",
        email: "hdquang.1999@gmail.com",
      },
    ],
    // toi ve lam search sinh vien
  };
  static getDerivedStateFromProps(newProps, currentState) {
    // console.log("getDerivedStateFromProps");
    return null;
  }
  // shouldComponentUpdate(newProps, newState) {
  //   return true;
  // }
  checkFormValid = () => {
    let { formError, formValue } = this.state;
    for (let key in formError) {
      if (formError[key] !== "" || formValue[key] === "") {
        return false;
      }
    }
    return true;
  };
  removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str.trim().toLowerCase();
  };
  handleSearchInput = (e) => {
    let tuKhoa = e.target.value;
    tuKhoa = tuKhoa.trim().toLowerCase();
    tuKhoa = this.removeVietnameseTones(tuKhoa);
    let arrSinhVien = this.state.arrSinhVien;
    let c = [];
    arrSinhVien.forEach((sv) => {
      var tenSinhVien = sv.tenSV;
      tenSinhVien = this.removeVietnameseTones(tenSinhVien);
      if (tuKhoa === "") {
        c = arrSinhVien;
      } else if (tenSinhVien.includes(tuKhoa)) {
        c.push(sv);
      }
    });

    this.setState({
      searchArrSinhVien: c,
    });
  };
  handleChangeInput = (e) => {
    let { value, name } = e.target;
    let dataType = e.target.getAttribute("data-type");
    let dataMaxLength = e.target.getAttribute("data-max-length");
    let dataExists = e.target.getAttribute("data-name-exists");
    console.log(dataExists);

    let newFormValue = this.state.formValue;
    newFormValue[name] = value;
    let newFormError = this.state.formError;
    let message = "";
    var arrTenSinhVien = this.state.arrSinhVien.map((sv) => sv.tenSV);
    console.log(arrTenSinhVien);
    if (value.trim() === "") {
      message = `${name} không được bỏ trống !`;
    } else {
      if (dataType === "number") {
        let regexNumber = new RegExp(/^[0-9]+$/);
        if (!regexNumber.test(value)) {
          message = `${name} phải là số`;
        }
      }
      if (dataType === "email") {
        let regexEmail = new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (!regexEmail.test(value)) {
          message = `${name} phải nhập đúng định dạng`;
        }
      }
      if (dataMaxLength !== null && value.length > dataMaxLength) {
        message = `${name} không được dài hơn ${dataMaxLength} ký tự !`;
      }
      console.log(newFormValue[name]);
      if (name === "tenSV" && arrTenSinhVien.includes(newFormValue[name])) {
        message = `${name} đã tồn tại !`;
      }
    }
    newFormError[name] = message;
    this.setState(
      {
        formValue: newFormValue,
        formError: newFormError,
      },
      () => {
        this.setState({
          valid: this.checkFormValid(),
        });
      }
    );
  };
  createSinhVien = (e) => {
    e.preventDefault();
    if (!this.checkFormValid()) {
      alert("Form is invalid!");
      return;
    }
    let arrSinhVien = this.state.arrSinhVien;
    let newArrSinhVien = { ...this.state.formValue };
    let index = arrSinhVien.findIndex((sv) => sv.maSV === newArrSinhVien.maSV);
    if (index !== -1) {
      alert("Mã Sinh viên này đã tồn tại");
      return;
    }
    arrSinhVien.push(newArrSinhVien);
    this.setState({
      arrSinhVien: arrSinhVien,
    });
  };
  updateSinhVien = () => {
    let { arrSinhVien, formValue } = this.state;
    let sinhVienUpdate = arrSinhVien.find((sv) => sv.maSV === formValue.maSV);
    if (sinhVienUpdate) {
      for (let key in sinhVienUpdate) {
        if (key !== "maSV") {
          sinhVienUpdate[key] = formValue[key];
        }
      }
    }
    this.setState({
      arrSinhVien: arrSinhVien,
    });
  };
  handleUpdateSinhVien = (svUpdate) => {
    this.setState(
      {
        formValue: svUpdate,
      },
      () => {
        this.setState({
          valid: this.checkFormValid(),
        });
      }
    );
  };
  handleDeleteSinhVien = (maSV) => {
    let arrSinhVien = this.state.arrSinhVien.filter((sv) => sv.maSV !== maSV);
    this.setState({
      arrSinhVien: arrSinhVien,
    });
  };
  render() {
    let { formValue } = this.state;
    return (
      <>
        <form className="container mt-5" onSubmit={this.createSinhVien}>
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h3>Thông tin sinh viên</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <p className="mb-0">Mã SV</p>
                    <input
                      type="text"
                      name="maSV"
                      value={formValue.maSV}
                      data-type="number"
                      data-max-length="6"
                      className="form-control"
                      disabled={this.state.isDisable}
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.maSV && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.maSV}
                      </div>
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <p className="mb-0">Số điện thoại</p>
                    <input
                      type="text"
                      name="soDienThoai"
                      value={formValue.soDienThoai}
                      data-type="number"
                      data-max-length="11"
                      className="form-control"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.soDienThoai && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.soDienThoai}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p className="mb-0">Họ tên</p>
                    <input
                      type="text"
                      name="tenSV"
                      value={formValue.tenSV}
                      data-name-exists={formValue.tenSV}
                      className="form-control"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.tenSV && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.tenSV}
                      </div>
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <p className="mb-0">Email</p>
                    <input
                      type="text"
                      name="email"
                      value={formValue.email}
                      data-type="email"
                      className="form-control"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.email && (
                      <div className="alert alert-danger mt-2">
                        {this.state.formError.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-success m-2"
                disabled={!this.state.valid}
              >
                Thêm sinh viên
              </button>
              <button
                type="button"
                className="btn btn-primary m-2"
                disabled={!this.state.valid}
                onClick={this.updateSinhVien}
              >
                Cập nhật sinh viên
              </button>
            </div>
          </div>
          <div className="mt-2">
            <div className="input-group mb-3">
              <input
                type="search"
                name="tuKhoa"
                className="form-control"
                onInput={this.handleSearchInput}
              />
              {/* <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchSinhVien}
              >
                <i className="fas fa-search" />
              </button> */}
            </div>
          </div>
        </form>
        <div className="container mt-2">
          <TableSinhVien
            arrSinhVien={this.state.arrSinhVien}
            updateSinhVien={this.handleUpdateSinhVien}
            deleteSinhVien={this.handleDeleteSinhVien}
          />
        </div>
      </>
    );
  }
  // componentDidMount() {
  //   console.log("componentDidMount");
  // }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.formValue);
    console.log(prevProps);
    console.log(prevState);
  }
}
