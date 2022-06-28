// npx babel src --out-dir public --presets react-app/prod

const ADD_BOOK = 'ADD_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const FILL_BOOKS = 'FILL_BOOKS';
const SHOW_ADD_BOOK_FORM = 'SHOW_ADD_BOOK_FORM';
const HIDE_ADD_BOOK_FORM = 'HIDE_ADD_BOOK_FORM';
const TURN_ON_LOADING = 'TURN_ON_LOADING';
const TURN_OFF_LOADING = 'TURN_OFF_LOADING';

const addBook = (id, title, author, annotation, published) => {
  return {
    type: ADD_BOOK,
    id: id,
    title: title,
    author: author,
    annotation: annotation,
    published: published
  };
};

const deleteBook = (id) => {
  return {
    type: DELETE_BOOK,
    id: id
  };
};

const fillBooks = (books) => {
  return {
    type: FILL_BOOKS,
    books: books
  };
};

const showAddBookForm = () => {
  return {
    type: SHOW_ADD_BOOK_FORM
  };
};

const hideAddBookForm = () => {
  return {
    type: HIDE_ADD_BOOK_FORM
  };
};

const turnOnLoading = () => {
  return {
    type: TURN_ON_LOADING
  };
};

const turnOffLoading = () => {
  return {
    type: TURN_OFF_LOADING
  };
};

const booksReducer = (state = {
  books: [], addBookFormVisible: false, isLoading: false
}, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, books: state.books.concat({ id: action.id, title: action.title, author: action.author, annotation: action.annotation, published: action.published }).sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0) };
    case DELETE_BOOK:
      const index = state.books.map(element => element.id).indexOf(action.id);
      return { ...state, books: state.books.slice(0, index).concat(state.books.slice(index + 1)) };
    case FILL_BOOKS:
      return { ...state, books: [...action.books].sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0) };
    case SHOW_ADD_BOOK_FORM:
      return {
        ...state,
        addBookFormVisible: true
      };
    case HIDE_ADD_BOOK_FORM:
      return {
        ...state,
        addBookFormVisible: false
      };  
    case TURN_ON_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case TURN_OFF_LOADING:
      return {
        ...state,
        isLoading: false
      };      
    default:
      return state;
  }
};

const store = Redux.createStore(booksReducer);

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.turnOnLoading();
    fetch('/all')
      .then(response => response.json())
      .then(data => {
        this.props.fillBooks(data);
        this.turnOffLoading();
      });
  }

  addBook = (id, title, author, annotation, published) => {
    this.props.addBook(id, title, author, annotation, published);
  };  

  deleteBook = (id) => {
    this.props.deleteBook(id);
  };

  editBook = (event) => {
    // DEFINE EDIT LOGIC
    alert('EDIT LOGIC IS BEING DEVELOPED');
  };

  fillBooks = (books) => {
    this.props.fillBooks(books);
  };

  showAddBookForm = () => {
    this.props.showAddBookForm();
  };

  hideAddBookForm = (event) => {
    if (!event || event.target.id === 'add-book-form-bg') {
      this.props.hideAddBookForm();
    }
  };

  turnOnLoading = () => {
    this.props.turnOnLoading();
  };

  turnOffLoading = () => {
    this.props.turnOffLoading();
  };

  render() {
    return (
      <div>
        {this.props.isLoading ?
        <div className="loading-screen">
          <div className="loading-screen__lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        : null}
        <header><h1>Library System (3 side project suggested by Victoria Lo)</h1><button className="btn" id="btn-show-add-book-form" onClick={this.showAddBookForm}>Add book</button></header>
        <main>
          <ul className="book-tiles-list">
            {this.props.books.map(book => BookTileComponent({ book: book, deleteBook: this.deleteBook, editBook: this.editBook, turnOnLoading: this.turnOnLoading, turnOffLoading: this.turnOffLoading }))}
          </ul>
          {this.props.addBookFormVisible ? <AddBookComponent hideAddBookForm={this.hideAddBookForm} addBook={this.addBook} turnOnLoading={this.turnOnLoading} turnOffLoading={this.turnOffLoading} /> : null}
        </main>
      </div>
    );
  }
}

const BookTileComponent = (props) => {
  const deleteBook = (event) => {
    props.turnOnLoading();
    fetch('/delete', {
      method: 'DELETE',
      body: JSON.stringify({
        id: event.target.dataset.id
      }),
      headers: {
        'Content-Type': 'application/json',
      }      
    })
      .then(response => {
        props.turnOffLoading();
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(responseData => {
        if (!responseData.error) {
          props.deleteBook(event.target.dataset.id);
        } else {
          alert(responseData.errorMessage);
        }
      });  
  };
  
  return (<li key={props.book.id} className="book-tile">
    <section className="book-tile__information">
      <h2 className="book-tile__title-header">{props.book.title}</h2>
      <h3 className="book-tile__author-subheader">{props.book.author}</h3>
      <p className="book-tile__annotation">{props.book.annotation}</p>    
    </section>
    <section className="book-tile__controls">
      <button className="btn book-tile__btn" onClick={deleteBook} data-id={props.book.id}>Delete</button>
      <button className="btn book-tile__btn" onClick={props.editBook} data-id={props.book.id}>Edit</button>
    </section>    
  </li>);
};

class AddBookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      annotation: ''
    };
  }

  handleTitleChange = (event) => {
    this.setState(state => ({
      ...state,
      title: event.target.value
    }));
  };

  handleAuthorChange = (event) => {
    this.setState(state => ({
      ...state,
      author: event.target.value
    }));
  };  

  handleAnnotationChange = (event) => {
    this.setState(state => ({
      ...state,
      annotation: event.target.value
    }));
  };  

  submitAddBook = (event) => {
    event.preventDefault();

    this.props.turnOnLoading();
    fetch('/add', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        annotation: this.state.annotation,
        published: 'dummy published'
      }),
      headers: {
        'Content-Type': 'application/json',
      }      
    })
      .then(response => {
        this.props.turnOffLoading();
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(responseData => {
        if (!responseData.error) {
          this.props.addBook(responseData.id, this.state.title, this.state.author, this.state.annotation, 'dummy published');
          this.props.hideAddBookForm();
        } else {
          alert(responseData.errorMessage);
        }
      });   
  };

  render() {
    return (
      <div id="add-book-form-bg" onClick={this.props.hideAddBookForm}>
        <form id="add-book-form">
          <section>
            <label for="title">Input title</label>
            <input type="text" id="title" name="title" onChange={this.handleTitleChange} maxlength="64" placeholder="The Great Gatsby" required />
          </section>
          <section>
            <label for="author">Input author</label>
            <input type="text" id="author" name="author" onChange={this.handleAuthorChange} maxlength="64" placeholder="F. Scott Fitzgerald" required />
          </section>
          <section>
            <label for="annotation">Input annotation</label>
            <textarea id="annotation" name="annotation" onChange={this.handleAnnotationChange} maxlength="512" rows="8" placeholder="The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."></textarea>
          </section>
          <button type="submit" className="btn" id="btn-add-book" onClick={this.submitAddBook}>Add book</button>
        </form>
      </div>
    );
  }
}

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (id, title, author, annotation, published) => {
      dispatch(addBook(id, title, author, annotation, published));
    },
    deleteBook: (id) => {
      dispatch(deleteBook(id));
    },
    fillBooks: (books) => {
      dispatch(fillBooks(books));
    },
    showAddBookForm: () => {
      dispatch(showAddBookForm());
    },
    hideAddBookForm: () => {
      dispatch(hideAddBookForm());
    },
    turnOnLoading: () => {
      dispatch(turnOnLoading());
    },
    turnOffLoading: () => {
      dispatch(turnOffLoading());
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

const librarySystemApp = (
  <Provider store={store}>
    <Container />
  </Provider>
);

const appContainer = document.querySelector('#app-container');
const root = ReactDOM.createRoot(appContainer);
root.render(librarySystemApp);