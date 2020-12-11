import React, { Component } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'
import './App.css';

class App extends Component {

  state = {
    name: '',
    receiptId: 0,
    itemName1:'',
    itemName2:'',
    price1: 0,
    price2: 0
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

        saveAs(pdfBlob, 'newPdf.pdf')
      })
  }

  render() {
    return (
      <>
        {/* <div className="container mt-5">
          <input type="text" placeholder="Name" name="name" onChange={this.handleChange}></input>
          <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange}></input>
          <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange}></input>
          <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange}></input>
          <button onClick={this.createAndDownloadPdf}>Download PDF</button>
        </div> */}
          <h1 className="text-center p-2">Billing</h1>
        <div className="container pt-3">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="Name" className="form-label">Customer Name</label>
              <input type="text" className="form-control" name="name" required onChange={this.handleChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Receipt ID" className="form-label">Receipt ID</label>
              <input type="number" className="form-control" required name="receiptId" onChange={this.handleChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Item Name 1" className="form-label">Item Name 1</label>
              <input type="text" className="form-control" name="itemName1" onChange={this.handleChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Amount 1" className="form-label">Amount 1</label>
              <input type="number" className="form-control" name="price1" onChange={this.handleChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Item Name 2" className="form-label">Item Name 2</label>
              <input type="text" className="form-control" name="itemName2" onChange={this.handleChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Amount 2" className="form-label">Amount 2</label>
              <input type="number" className="form-control" name="price2" onChange={this.handleChange} />
            </div>
            <div className="col-12 mx-auto text-center">
              <button onClick={this.createAndDownloadPdf} type="button" className="center btn btn-outline-primary">Download PDF</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default App;
