import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    title: 'Cadastro de ingredientes',
}

const baseUrl = 'http://localhost:3001/ingredientes'
const initialState = {
    ingrediente: { descricao: '', valor: '' },
    list: []
}

export default class Ingredientes extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ ingrediente: initialState.ingrediente })
    }

    save() {
        const ingrediente = this.state.ingrediente
        const method = ingrediente.id ? 'put' : 'post'
        const url = ingrediente.id ? `${baseUrl}/${ingrediente.id}` : baseUrl
        axios[method](url, ingrediente)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ ingrediente: initialState.ingrediente, list })
            })
    }

    getUpdatedList(ingrediente, add = true) {
        const list = this.state.list.filter(u => u.id !== ingrediente.id)
        if (add) list.unshift(ingrediente)
        return list
    }

    updateField(event) {
        const ingrediente = { ...this.state.ingrediente }
        ingrediente[event.target.name] = event.target.value
        this.setState({ ingrediente })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Ingrediente</label>
                            <input type="text" className="form-control"
                                name="descricao"
                                value={this.state.ingrediente.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do ingrediente..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="text" className="form-control"
                                name="valor"
                                value={this.state.ingrediente.valor}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o valor..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(ingrediente) {
        this.setState({ ingrediente })
    }

    remove(ingrediente) {
        axios.delete(`${baseUrl}/${ingrediente.id}`).then(resp => {
            const list = this.getUpdatedList(ingrediente, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(ingrediente => {
            return (
                <tr key={ingrediente.id}>
                    <td>{ingrediente.id}</td>
                    <td>{ingrediente.descricao}</td>
                    <td>R$ {ingrediente.valor}</td>
                    <td>
                        <button className="btn btn-warning"
                            title="Editar"
                            onClick={() => this.load(ingrediente)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            title="Deletar"
                            onClick={() => this.remove(ingrediente)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}