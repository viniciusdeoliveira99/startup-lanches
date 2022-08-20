import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    title: 'Cadastro de lanches'
}

const baseUrl = 'http://localhost:3001/lanches'
const initialState = {
    lanche: { descricao: '' },
    list: []
}

export default class Lanches extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ lanche: initialState.lanche })
    }

    save() {
        const lanche = this.state.lanche
        const method = lanche.id ? 'put' : 'post'
        const url = lanche.id ? `${baseUrl}/${lanche.id}` : baseUrl
        axios[method](url, lanche)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ lanche: initialState.lanche, list })
            })
    }

    getUpdatedList(lanche, add = true) {
        const list = this.state.list.filter(u => u.id !== lanche.id)
        if (add) list.unshift(lanche)
        return list
    }

    updateField(event) {
        const lanche = { ...this.state.lanche }
        lanche[event.target.name] = event.target.value
        this.setState({ lanche })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Lanche</label>
                            <input type="text" className="form-control"
                                name="descricao"
                                value={this.state.lanche.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do lanche..." />
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

    load(lanche) {
        this.setState({ lanche })
    }

    remove(lanche) {
        axios.delete(`${baseUrl}/${lanche.id}`).then(resp => {
            const list = this.getUpdatedList(lanche, false)
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
        return this.state.list.map(lanche => {
            return (
                <tr key={lanche.id}>
                    <td>{lanche.id}</td>
                    <td>{lanche.descricao}</td>
                    <td>
                        <button className="btn btn-warning"
                            title="Editar"
                            onClick={() => this.load(lanche)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            title="Deletar"
                            onClick={() => this.remove(lanche)}>
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