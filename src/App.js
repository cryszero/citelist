import React, { Component } from 'react';
import Cite from './components/Cite';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [],
                   filter: '',
                   isModalOpen: false,
                   currentCite: { category: '', text: '', author: '', date: '', citeIndex: null}};
    this.importCites = this.importCites.bind(this);
    this.loadCites = this.loadCites.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.filterInput = React.createRef();
  }

  async importCites() {
    const asinc = () => {
      return new Promise(resolve => {
        setTimeout(() => resolve(require('./cites.json')), 2000);
      });
    };
    let citeList = await asinc();
    let buffer = [];
    for(let index in citeList) {
      let cite = citeList[index];
      buffer.push(cite);
    }
    this.setState({ posts: [...this.state.posts, ...buffer]});
  }

  loadCites() {
    for(let i in this.state) {
      console.log(this.state[i]);
    }
  }

  handleFilter() {
    this.setState({ filter: this.filterInput.current.value });
  }

  renderPosts() {
    return this.state.posts.filter(post => post.author.toLowerCase().includes(this.state.filter.toLowerCase()) || post.category.toLowerCase().includes(this.state.filter.toLowerCase()) || this.state.filter === '')
        .map((post, i) => 
          <Cite
          key={i}
          info={post}
          onDelete={() => this.handleDelete(i)}
          onEdit={() => this.handleEdit(i)}
          />);
  }

  handleDelete(i) {
    this.setState({ posts: this.state.posts.filter((post, index) => index !== i)});
  }

  handleEdit(i) {
    this.setState({ isModalOpen: true, currentCite: {...this.state.posts[i], citeIndex: i}});
  }

  handleChange(e) {
    this.setState({ currentCite: {...this.state.currentCite, [e.target.name]: e.target.value }});
  }

  handleCreate() {
    this.setState({ isModalOpen: true, currentCite: { category: '', text: '', author: '', date: '', citeIndex: this.state.posts.length }});
  }

  closeModal() {
    this.setState({ isModalOpen: false});
  }

  saveModal() {
    const { posts, currentCite } = this.state;
    const buffer = posts;
    buffer.splice(currentCite.citeIndex, 1, currentCite);
    this.setState({ isModalOpen: false, posts: buffer });
  }

  componentDidMount() {
    this.importCites();
  }

  render() {
    return (
      <div className='app'>
        <Modal
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()}
          fields={this.state.currentCite}
          onSave={() => this.saveModal()}
          onChangeField={(e) => this.handleChange(e)}/>
        <div className='app__filter'>
          <input
            type='text'
            onChange={this.handleFilter}
            placeholder='фильтровать по..'
            ref={this.filterInput}
            className='app__filter-input'/>
          <button
            className='app__filter-button'
            onClick={() => this.handleCreate()}>Создать новую цитату</button>
        </div>
        {this.renderPosts()}
      </div>
    );
  }
}

export default App;
