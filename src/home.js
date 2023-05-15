import {Component} from "react";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            products: [
                {name: 'bánh đa', price: 900},
                {name: 'bánh kem', price: 400},
                {name: 'bánh chuối', price: 300}
            ],
            inName: '',
            inPrice: '',
            ind: '',
            name: '',
            isShow: false
        }
    }

    add = () => {
        this.setState(
            {
                products: [...this.state.products, {
                    name: this.state.inName,
                    price: this.state.inPrice
                }],
                inName: '',
                inPrice: ''
            }
        )
    }
    change = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    showValueEdit = (e) => {
        let a = e.target.value
        this.state.products.map((item, ind) => {
            if (ind === +a) {
                this.setState({inName: item.name})
                this.setState({inPrice: item.price})
                this.setState({ind: a})
            }
        })
        this.setState(state => {
            return {
                isShow: true
            }
        })
    }
    edit = () => {
        this.setState((state) => {
            state.products.map((item, ind) => {
                if (ind === +state.ind) {
                    item.name = state.inName
                    item.price = state.inPrice
                }
            })
            return {
                state,
                inName: '',
                inPrice: '',
                isShow: false
            }
        })
    }

    render() {
        return (
            <>
                {this.state.products.map((item, ind) => (
                    <div key={ind}>
                        <h1 key={ind}>name: {item.name} - price: {item.price}$</h1>
                        <button value={ind}  onClick={(e) => {this.showValueEdit(e)}}>Edit</button>
                        {!this.state.isShow && <>
                            <button  onClick={(e) => {
                                this.setState( state => {
                                    let oldProducts = [...state.products];
                                    oldProducts.splice(ind, 1);
                                    return {
                                        products: oldProducts
                                    }
                                })
                            }}>Delete</button>
                        </>}
                        <br/>
                    </div>
                ))}
                <br/>
                <input placeholder={"name"} type="text" name={"inName"} value={this.state.inName} onChange={this.change}/>
                <input placeholder={"price"} type="text" name={"inPrice"} value={this.state.inPrice} onChange={this.change}/>
                {!this.state.isShow && <button onClick={this.add}>ADD</button>}
                {this.state.isShow && <button onClick={this.edit}>Edit</button>}
                <br/>
            </>
        )
    }
}

export default Home;