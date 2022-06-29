var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// npx babel src --out-dir public --presets react-app/prod

var ADD_BOOK = 'ADD_BOOK';
var EDIT_BOOK = 'EDIT_BOOK';
var SUBMIT_EDIT_BOOK = 'SUBMIT_EDIT_BOOT';
var DELETE_BOOK = 'DELETE_BOOK';
var FILL_BOOKS = 'FILL_BOOKS';
var SHOW_ADD_BOOK_FORM = 'SHOW_ADD_BOOK_FORM';
var HIDE_ADD_BOOK_FORM = 'HIDE_ADD_BOOK_FORM';
var TURN_ON_LOADING = 'TURN_ON_LOADING';
var TURN_OFF_LOADING = 'TURN_OFF_LOADING';

var _addBook = function _addBook(id, title, author, annotation, published) {
  return {
    type: ADD_BOOK,
    id: id,
    title: title,
    author: author,
    annotation: annotation,
    published: published
  };
};

var _editBook = function _editBook(id, title, author, annotation, published) {
  return {
    type: EDIT_BOOK,
    id: id,
    title: title,
    author: author,
    annotation: annotation,
    published: published
  };
};

var _submitEditBook = function _submitEditBook(id, title, author, annotation, published) {
  return {
    type: SUBMIT_EDIT_BOOK,
    id: id,
    title: title,
    author: author,
    annotation: annotation,
    published: published
  };
};

var _deleteBook = function _deleteBook(id) {
  return {
    type: DELETE_BOOK,
    id: id
  };
};

var _fillBooks = function _fillBooks(books) {
  return {
    type: FILL_BOOKS,
    books: books
  };
};

var _showAddBookForm = function _showAddBookForm() {
  return {
    type: SHOW_ADD_BOOK_FORM
  };
};

var _hideAddBookForm = function _hideAddBookForm() {
  return {
    type: HIDE_ADD_BOOK_FORM
  };
};

var _turnOnLoading = function _turnOnLoading() {
  return {
    type: TURN_ON_LOADING
  };
};

var _turnOffLoading = function _turnOffLoading() {
  return {
    type: TURN_OFF_LOADING
  };
};

var booksReducer = function booksReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    books: [], addBookFormVisible: false, isLoading: false, editedBook: null };
  var action = arguments[1];

  switch (action.type) {
    case ADD_BOOK:
      return Object.assign({}, state, { books: state.books.concat({ id: action.id, title: action.title, author: action.author, annotation: action.annotation, published: action.published }).sort(function (a, b) {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        }), editedBook: null });
    case EDIT_BOOK:
      return Object.assign({}, state, { editedBook: { id: action.id, title: action.title, author: action.author, annotation: action.annotation, published: action.published } });
    case SUBMIT_EDIT_BOOK:
      return Object.assign({}, state, { books: state.books.map(function (book) {
          return book.id === action.id ? { id: book.id, title: action.title, author: action.author, annotation: action.annotation, published: action.published } : book;
        }).sort(function (a, b) {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        }), editedBook: null });
    case DELETE_BOOK:
      var index = state.books.map(function (element) {
        return element.id;
      }).indexOf(action.id);
      return Object.assign({}, state, { books: state.books.slice(0, index).concat(state.books.slice(index + 1)), editedBook: null });
    case FILL_BOOKS:
      return Object.assign({}, state, { books: [].concat(_toConsumableArray(action.books)).sort(function (a, b) {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        }), editedBook: null });
    case SHOW_ADD_BOOK_FORM:
      return Object.assign({}, state, {
        addBookFormVisible: true
      });
    case HIDE_ADD_BOOK_FORM:
      return Object.assign({}, state, {
        addBookFormVisible: false
      });
    case TURN_ON_LOADING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case TURN_OFF_LOADING:
      return Object.assign({}, state, {
        isLoading: false
      });
    default:
      return state;
  }
};

var store = Redux.createStore(booksReducer);

var Presentational = function (_React$Component) {
  _inherits(Presentational, _React$Component);

  function Presentational(props) {
    _classCallCheck(this, Presentational);

    var _this = _possibleConstructorReturn(this, (Presentational.__proto__ || Object.getPrototypeOf(Presentational)).call(this, props));

    _this.addBook = function (id, title, author, annotation, published) {
      _this.props.addBook(id, title, author, annotation, published);
    };

    _this.editBook = function (id, title, author, annotation, published) {
      _this.props.editBook(id, title, author, annotation, published);
    };

    _this.submitEditBook = function (id, title, author, annotation, published) {
      _this.props.submitEditBook(id, title, author, annotation, published);
    };

    _this.deleteBook = function (id) {
      _this.props.deleteBook(id);
    };

    _this.fillBooks = function (books) {
      _this.props.fillBooks(books);
    };

    _this.showAddBookForm = function () {
      _this.props.showAddBookForm();
    };

    _this.hideAddBookForm = function (event) {
      if (!event || event.target.id === 'add-book-form-bg') {
        _this.props.hideAddBookForm();
      }
    };

    _this.turnOnLoading = function () {
      _this.props.turnOnLoading();
    };

    _this.turnOffLoading = function () {
      _this.props.turnOffLoading();
    };

    return _this;
  }

  _createClass(Presentational, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.turnOnLoading();
      fetch('/all').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.props.fillBooks(data);
        _this2.turnOffLoading();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        null,
        this.props.isLoading ? React.createElement(
          'div',
          { className: 'loading-screen' },
          React.createElement(
            'div',
            { className: 'loading-screen__lds-default' },
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null),
            React.createElement('div', null)
          )
        ) : null,
        React.createElement(
          'header',
          null,
          React.createElement(
            'h1',
            null,
            'Library System (3 side project suggested by Victoria Lo)'
          ),
          React.createElement(
            'button',
            { className: 'btn', id: 'btn-show-add-book-form', onClick: this.showAddBookForm },
            'Add book'
          )
        ),
        React.createElement(
          'main',
          null,
          React.createElement(
            'ul',
            { className: 'book-tiles-list' },
            this.props.books.map(function (book) {
              return BookTileComponent({ book: book, deleteBook: _this3.deleteBook, editBook: _this3.editBook, showAddBookForm: _this3.showAddBookForm, turnOnLoading: _this3.turnOnLoading, turnOffLoading: _this3.turnOffLoading });
            })
          ),
          this.props.addBookFormVisible ? React.createElement(AddBookComponent, { hideAddBookForm: this.hideAddBookForm, addBook: this.addBook, submitEditBook: this.submitEditBook, turnOnLoading: this.turnOnLoading, turnOffLoading: this.turnOffLoading, editedBook: this.props.editedBook }) : null
        )
      );
    }
  }]);

  return Presentational;
}(React.Component);

var BookTileComponent = function BookTileComponent(props) {
  var deleteBook = function deleteBook(event) {
    props.turnOnLoading();
    fetch('/delete', {
      method: 'DELETE',
      body: JSON.stringify({
        id: event.target.dataset.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      props.turnOffLoading();
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('HTTP error! Status: ' + response.status);
      }
    }).then(function (responseData) {
      if (!responseData.error) {
        props.deleteBook(event.target.dataset.id);
      } else {
        alert(responseData.errorMessage);
      }
    });
  };

  var editBook = function editBook(event) {
    props.editBook(event.target.dataset.id, event.target.dataset.title, event.target.dataset.author, event.target.dataset.annotation);
    props.showAddBookForm();
  };

  return React.createElement(
    'li',
    { key: props.book.id, className: 'book-tile' },
    React.createElement(
      'section',
      { className: 'book-tile__information' },
      React.createElement(
        'h2',
        { className: 'book-tile__title-header' },
        props.book.title
      ),
      React.createElement(
        'h3',
        { className: 'book-tile__author-subheader' },
        props.book.author
      ),
      React.createElement(
        'p',
        { className: 'book-tile__annotation' },
        props.book.annotation
      )
    ),
    React.createElement(
      'section',
      { className: 'book-tile__controls' },
      React.createElement(
        'button',
        { className: 'btn book-tile__btn', onClick: deleteBook, 'data-id': props.book.id },
        'Delete'
      ),
      React.createElement(
        'button',
        { className: 'btn book-tile__btn', onClick: editBook, 'data-id': props.book.id, 'data-title': props.book.title, 'data-author': props.book.author, 'data-annotation': props.book.annotation },
        'Edit'
      )
    )
  );
};

var AddBookComponent = function (_React$Component2) {
  _inherits(AddBookComponent, _React$Component2);

  function AddBookComponent(props) {
    _classCallCheck(this, AddBookComponent);

    var _this4 = _possibleConstructorReturn(this, (AddBookComponent.__proto__ || Object.getPrototypeOf(AddBookComponent)).call(this, props));

    _this4.handleTitleChange = function (event) {
      _this4.setState(function (state) {
        return Object.assign({}, state, {
          title: event.target.value
        });
      });
    };

    _this4.handleAuthorChange = function (event) {
      _this4.setState(function (state) {
        return Object.assign({}, state, {
          author: event.target.value
        });
      });
    };

    _this4.handleAnnotationChange = function (event) {
      _this4.setState(function (state) {
        return Object.assign({}, state, {
          annotation: event.target.value
        });
      });
    };

    _this4.submitAddBook = function (event) {
      event.preventDefault();

      _this4.props.turnOnLoading();
      fetch('/add', {
        method: 'POST',
        body: JSON.stringify({
          title: _this4.state.title,
          author: _this4.state.author,
          annotation: _this4.state.annotation,
          published: 'dummy published'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        _this4.props.turnOffLoading();
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('HTTP error! Status: ' + response.status);
        }
      }).then(function (responseData) {
        if (!responseData.error) {
          _this4.props.addBook(responseData.id, _this4.state.title, _this4.state.author, _this4.state.annotation, 'dummy published');
          _this4.props.hideAddBookForm();
        } else {
          alert(responseData.errorMessage);
        }
      });
    };

    _this4.submitEditBook = function (event) {
      event.preventDefault();

      _this4.props.turnOnLoading();
      fetch('/edit', {
        method: 'PATCH',
        body: JSON.stringify({
          id: _this4.state.id,
          title: _this4.state.title,
          author: _this4.state.author,
          annotation: _this4.state.annotation,
          published: 'dummy published'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        _this4.props.turnOffLoading();
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('HTTP error! Status: ' + response.status);
        }
      }).then(function (responseData) {
        if (!responseData.error) {
          _this4.props.submitEditBook(_this4.state.id, _this4.state.title, _this4.state.author, _this4.state.annotation, 'dummy published');
          _this4.props.hideAddBookForm();
        } else {
          alert(responseData.errorMessage);
        }
      });
    };

    if (props.editedBook) {
      _this4.state = {
        id: props.editedBook.id,
        title: props.editedBook.title,
        author: props.editedBook.author,
        annotation: props.editedBook.annotation,
        editMode: true
      };
    } else {
      _this4.state = {
        title: '',
        author: '',
        annotation: '',
        editMode: false
      };
    }
    return _this4;
  }

  _createClass(AddBookComponent, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'add-book-form-bg', onClick: this.props.hideAddBookForm },
        React.createElement(
          'form',
          { id: 'add-book-form' },
          React.createElement(
            'section',
            null,
            React.createElement(
              'label',
              { 'for': 'title' },
              'Input title'
            ),
            React.createElement('input', { type: 'text', id: 'title', name: 'title', onChange: this.handleTitleChange, maxlength: '64', placeholder: 'The Great Gatsby', value: this.state.title, required: true })
          ),
          React.createElement(
            'section',
            null,
            React.createElement(
              'label',
              { 'for': 'author' },
              'Input author'
            ),
            React.createElement('input', { type: 'text', id: 'author', name: 'author', onChange: this.handleAuthorChange, maxlength: '64', placeholder: 'F. Scott Fitzgerald', value: this.state.author, required: true })
          ),
          React.createElement(
            'section',
            null,
            React.createElement(
              'label',
              { 'for': 'annotation' },
              'Input annotation'
            ),
            React.createElement(
              'textarea',
              { id: 'annotation', name: 'annotation', onChange: this.handleAnnotationChange, maxlength: '512', rows: '8', placeholder: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.' },
              this.state.annotation
            )
          ),
          React.createElement(
            'button',
            { type: 'submit', className: 'btn', id: 'btn-add-book', onClick: this.state.editMode ? this.submitEditBook : this.submitAddBook },
            this.state.editMode ? "Edit book" : "Add book"
          )
        )
      );
    }
  }]);

  return AddBookComponent;
}(React.Component);

var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

var mapStateToProps = function mapStateToProps(state) {
  return Object.assign({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBook: function addBook(id, title, author, annotation, published) {
      dispatch(_addBook(id, title, author, annotation, published));
    },
    editBook: function editBook(id, title, author, annotation, published) {
      dispatch(_editBook(id, title, author, annotation, published));
    },
    submitEditBook: function submitEditBook(id, title, author, annotation, published) {
      dispatch(_submitEditBook(id, title, author, annotation, published));
    },
    deleteBook: function deleteBook(id) {
      dispatch(_deleteBook(id));
    },
    fillBooks: function fillBooks(books) {
      dispatch(_fillBooks(books));
    },
    showAddBookForm: function showAddBookForm() {
      dispatch(_showAddBookForm());
    },
    hideAddBookForm: function hideAddBookForm() {
      dispatch(_hideAddBookForm());
    },
    turnOnLoading: function turnOnLoading() {
      dispatch(_turnOnLoading());
    },
    turnOffLoading: function turnOffLoading() {
      dispatch(_turnOffLoading());
    }
  };
};

var Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

var librarySystemApp = React.createElement(
  Provider,
  { store: store },
  React.createElement(Container, null)
);

var appContainer = document.querySelector('#app-container');
var root = ReactDOM.createRoot(appContainer);
root.render(librarySystemApp);