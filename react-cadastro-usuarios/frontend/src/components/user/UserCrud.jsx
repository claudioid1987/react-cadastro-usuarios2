import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'users',
  title: 'fornecedores',
  subtitle: 'Tela de gerenciamento de fornecedores'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
  user: { name: '', email: '', },

  list: []
}


export default class UserCrud extends Component {

  state = { ...initialState }

  componentWillMount() {
    axios(baseUrl).then(resp => {
      console.log(resp);

      this.setState({ list: resp.data })
    })
  }

  clear() {
    this.setState({ user: initialState.user })
  }

  save() {
    const user = this.state.user
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    axios[method](url, user)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({ user: initialState.user, list })
      })
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(u => u.id !== user.id)
    if (add) list.unshift(user)
    return list
  }

  updateField(event) {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          
          <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">            
              <label>Nome Fantasia</label>
              <input type="text" className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome fantasia"
              />
            </div>
          </div>
          
        <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">            
              <label>Razão Social</label>
              <input type="text" className="form-control"
                name="corporate_name"
                value={this.state.user.corporate_name}
                onChange={e => this.updateField(e)}
                placeholder="Digite a razão social"
              />
            </div>
          </div>

          <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">            
              <label>Responsável Legal</label>
              <input type="text" className="form-control"
                name="legal_responsible"
                value={this.state.user.legal_responsible}
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome do responsável legal"
              />
            </div>
          </div>


          <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">            
              <label>CNPJ</label>
              <input type="number" className="form-control"
                name="cnpj"
                value={this.state.cnpj}
                onChange={e => this.updateField(e)}
                placeholder="Digite os números do CNPJ"
              />
            </div>
          </div>

          <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">            
              <label>Segmento da empresa</label>
              <input type="text" className="form-control"
                name="company_segment"
                value={this.state.user.company_segment}
                onChange={e => this.updateField(e)}
                placeholder="Digite o segmento da empresa"
              />
            </div>
          </div>

          <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">            
              <label>Endereço</label>
              <input type="text" className="form-control"
                name="address"
                value={this.state.user.address}
                onChange={e => this.updateField(e)}
                placeholder="Digite o endereço completo"
              />
            </div>
          </div>

          

          <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">            
              <label> Telefone para contato</label>
              <input type="number" className="form-control"
                name="telefone"
                value={this.state.user.telefone}
                onChange={e => this.updateField(e)}
                placeholder="Digite o telefone"
              />
            </div>
          </div>


          <div className="col-xs-12 col-sm-9 col-md-6">
            <div className="form-group">
              <label>E-mail</label>
              <input type="text" className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={e => this.updateField(e)}
                placeholder="Digite o e-mail..."
              />
            </div>
          </div>

        </div>

        <hr />

        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary"
              onClick={e => this.save(e)}
            >
              Arquivar
            </button>
            <button className="btn btn-secondary ml-2"
              onClick={e => this.save(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  load(user) {
    this.setState({ user })
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.getUpdatedList(user, false)
      this.setState({ list })
    })
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome fantasia</th>
            <th>Razão social</th>
            <th>Responsável Legal</th>
            <th>CNPJ</th>
            <th>Segmento</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>E-mail</th>            
            </tr>
          
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }


  renderRows() {
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.corporate_name}</td> 
          <td>{user.legal_responsible}</td>
          <td>{user.cnpj}</td>
          <td>{user.company_segment}</td>
          <td>{user.address}</td>
          <td>{user.telefone}</td>
          <td>{user.email}</td>


                    <td>
            <button className="btn btn-warning"
              onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            
            <button className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }
  render() {
    console.log(this.state.list);
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}
