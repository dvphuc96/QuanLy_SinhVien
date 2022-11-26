import React, { Component } from "react";

export default class TableSinhVien extends Component {
  render() {
    const { arrSinhVien, updateSinhVien, deleteSinhVien } = this.props;
    return (
      <div>
        <table className="table">
          <thead className="bg-dark text-white">
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {arrSinhVien.map(({maSV, tenSV, soDienThoai, email}, index) => {
              return (
                <tr key={index}>
                  <td>{maSV}</td>
                  <td>{tenSV}</td>
                  <td>{soDienThoai}</td>
                  <td>{email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteSinhVien(maSV);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        let svUpdate = {maSV, tenSV, soDienThoai, email}
                        updateSinhVien(svUpdate);
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
