import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, props } from "react-bootstrap";
import { fetchData } from "../js/index";
import _ from "lodash";

class TableData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      data: [],
      isDataLoaded: false,
      openIndex: 0,
      SearchData: [],
      isSearchData: false,
    };


  }


  componentDidMount = async () => {
    let url = 'http://www.json-generator.com/api/json/get/bUPzMCOtgy?indent=2';
    const resData = await fetchData(url);
   
		if (resData &&  _.get(resData, "status", 200) === 200) {
			this.setState({
				data:resData.data,
				isDataLoaded:true
			}); 
		}else{
			this.setState({
				data:{},
				isDataLoaded:false
			}); 
		}
  }

  onSearch = (e) => {
    let target = e.target;
    let value = target.value;
    let dataArr = this.props.data.data.data || [];
    let SearchArr = [];
    let SearchArrIndex = [];
    if (value.length > 0) {
      dataArr.map((item, index) => {
        Object.keys(dataArr[index]).map((item2, index2) => {
          if (item2 !== 'index' && item2 !== 'isActive') {
            if (dataArr[index][item2].indexOf(value) != -1) {
              if (!SearchArrIndex.includes(index)) {
                SearchArr.push(dataArr[index]);
                SearchArrIndex.push(index);
              }
            }
          }
        })
      })
      this.setState({
        SearchData: SearchArr,
        isSearchData: true,
      })
    }
    else if (value.length == 0) {
      this.setState({
        SearchData: [],
        isSearchData: false,
      })
    }
  }


  modalHide = (e) => {
    this.setState({
      isModalOpen: false
    })
  }

  openModal = (e) => {
    const target = e.target;   

    if (target.classList.contains('tableicon') || target.parentElement.classList.contains('tableicon')) {   
      this.setState({
        openIndex: target.closest('.tablebRow').getAttribute('data-index'),
        isModalOpen: true,
      })
    }
  }


  render() {
    let data = this.state.data || [];
    let loading = !this.state.isDataLoaded;
    data = (this.state.isSearchData) ? this.state.SearchData : data || [];
    let modaldata = data[this.state.openIndex] || [];
   
 
    return (
      <>
        <section>
          <div class="container-fluid " >
            <div class="row">
              <div class="col-lg-10 col-md-12 col-12 mx-auto my-5 mobView">
                <div class="row">
                  <div class="col-12">
                    <div class="input-group mb-3 borderBottom">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent" id="basic-addon1"><FontAwesomeIcon icon={faSearch} class="searchIcon" size="1x" /></span>
                      </div>
                      <input type="text" class="form-control" placeholder="Search" onChange={(e) => this.onSearch(e)} />
                    </div>
                  </div>
                  <div class="col-12 btTable">
                    <div class="row tableHead">
                      <div class=" col-12">
                        <div class="row tablehRow">
                          <div class="col-1"><span>Sr No</span></div>
                          <div class="col-3"><span>Name</span></div>
                          <div class="col-2"><span>DOB</span></div>
                          <div class="col-2"><span>UserName</span></div>
                          <div class="col-3"><span>Email</span></div>
                          <div class="col-1"><span>Action</span></div>
                        </div>
                      </div>
                    </div>
                    <div class="row tableBody" onClick={this.openModal}>
                      <div class=" col-12">
                        {
                          (!loading && data.length > 0) ? data.map((item, index) => {

                            return (
                              <div class="row tablebRow" data-index={index} key={index}>
                                <div class="col-1"><span>{index + 1}</span></div>
                                <div class="col-3"><span>{item.name}</span></div>
                                <div class="col-2"><span>{item.dob}</span></div>
                                <div class="col-2"><span>{item.userName}</span></div>
                                <div class="col-3"><span>{item.email}</span></div>
                                <div class="col-1 tableicon"><FontAwesomeIcon icon={faEdit} class="editIcon tableicon" size="1x" /></div>
                              </div>
                            )
                          })
                            :
                            <div class="row tablebRow justify-content-center"> <span>Sorry No Data Loaded... </span></div>
                        }


                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        <Modal
          show={this.state.isModalOpen}
          onHide={this.modalHide}
          size="md"
          dialogClassName=""

        >
          <div className="ModalForm">
            <Modal.Header closeButton>
              {/* <Button onClick={this.modalClose}>Close</Button>  */}
            </Modal.Header>
            <Modal.Body >
              <div className="container-fluid ">
                <div class="row">
                  <div class="col-12 ">
                    <div class="form-group row">
                      <label for="DOB" class="col-sm-3 col-form-label">DOB</label>
                      <div class="col-sm-9 borderBottom">
                        <input type="text" readonly class="form-control-plaintext" id='DOB' value={modaldata.dob} name="DOB" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="Username" class="col-sm-3 col-form-label">Username</label>
                      <div class="col-sm-9 borderBottom">
                        <input type="text" class="form-control" id="Username" value={modaldata.userName} name="Username" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="Name" class="col-sm-3 col-form-label">Name</label>
                      <div class="col-sm-9 borderBottom">
                        <input type="text" class="form-control" id="Name" value={modaldata.name} name="Name" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="Email" class="col-sm-3 col-form-label">Email</label>
                      <div class="col-sm-9 borderBottom">
                        <input type="text" class="form-control" id="Email" value={modaldata.email} name="Email" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <div class="container-fluid">
                <div class="row justify-content-end">
                  <div className="text-center position-relative" onClick={this.modalHide} >
                    <button class="btn btn-outline-info" ><span class="overlay"></span></button>
                  </div>
                  <div className="text-center position-relative" onClick={this.modalHide} >
                    <button class="btn btn-outline-danger" ><span class="overlay"></span></button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    )

  }
}
export default TableData;


