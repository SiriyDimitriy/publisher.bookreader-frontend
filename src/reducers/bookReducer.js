const initialState = {
  title: null,
  author: null,
  avatar: null,
  pages: [
    {
      pageNumber: 0,
      headers: [],
      paragraphs: [],
      images: [],
      info: [],
      inputExercises: [],
      coinsExercises: [],
      gapExercises: [],
      openQuestionExercises: [],
      tableExercises: []
    }
  ]
};

function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2)
    return parts
      .pop()
      .split(';')
      .shift();
}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAN_BOOK': {
      let newState = JSON.parse(JSON.stringify(initialState));

      return newState;
    }
    case 'CREATE_NEW_BOOK': {
      let newState = { ...state };
      const token = getCookie('token');

      fetch('http://api.bookreader.k-3soft.com/api/books', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({ bookForm: action.newBook })
      })
        .then(responce => responce.json())
        .then(data => (newState = data));

      return { ...newState };
    }
    case 'COPY_BOOK': {
      return { ...action.book };
    }
    case 'CHANGE_BOOK_TITLE': {
      return { ...state, id: action.bookId, title: action.updatedText };
    }
    case 'CHANGE_BOOK_AUTHOR': {
      return { ...state, id: action.bookId, author: action.updatedText };
    }
    case 'CHANGE_PAGE_HEADER': {
      let newState = { ...state };
      const currentPage = state.pages.find(
        page => page.pageNumber == action.pageNumber
      );
      if (!currentPage) return newState;
      const currentHeader = currentPage.headers.find(
        header => header.id == action.headerId
      );
      if (!currentHeader) return newState;
      newState.pages[newState.pages.indexOf(currentPage)].headers[
        newState.pages[newState.pages.indexOf(currentPage)].headers.indexOf(
          currentHeader
        )
      ].header =
        action.updatedText;
      return newState;
    }
    case 'CHANGE_PAGE_PARAGRAPH': {
      let newState = { ...state };
      const currentPage = state.pages.find(
        page => page.pageNumber == action.pageNumber
      );
      if (!currentPage) return newState;
      const currentParagraph = currentPage.paragraphs.find(
        paragraph => paragraph.id == action.paragraphId
      );
      if (!currentParagraph) return newState;
      newState.pages[newState.pages.indexOf(currentPage)].paragraphs[
        newState.pages[newState.pages.indexOf(currentPage)].paragraphs.indexOf(
          currentParagraph
        )
      ].paragraph =
        action.updatedText;
      return newState;
    }
    case 'REMOVE_MEDIA': {
      let newState = { ...state };
      const currentPage = state.pages.find(
        page => page.pageNumber == action.pageNumber
      );
      if (!currentPage) return newState;
      const currentMedia = currentPage.images.find(
        image => image.order == action.mediaOrder
      );
      if (!currentMedia) return newState;
      newState.pages[newState.pages.indexOf(currentPage)].images[
        newState.pages[newState.pages.indexOf(currentPage)].images.indexOf(
          currentMedia
        )
      ] = { image: null, order: action.mediaOrder };
      return newState;
    }
    case 'SELECT_MEDIA': {
      let newState = { ...state };
      const currentPage = state.pages.find(
        page => page.pageNumber == action.pageNumber
      );
      if (!currentPage) return newState;
      const currentMedia = currentPage.images.find(
        image => image.order == action.mediaOrder
      );
      if (!currentMedia) return newState;
      newState.pages[newState.pages.indexOf(currentPage)].images[
        newState.pages[newState.pages.indexOf(currentPage)].images.indexOf(
          currentMedia
        )
      ].image =
        action.media;
      return newState;
    }
    case 'CHANGE_ORDER': {
      let newState = { ...state };

      const currentPage = newState.pages.find(
        page => page.pageNumber == action.pageNumber
      );

      if (!currentPage) return newState;
      const currentElem = [
        ...currentPage['headers'],
        ...currentPage['images'],
        ...currentPage['paragraphs']
      ].find(elem => elem.order == action.dragIndex);

      if (!currentElem) return newState;

      if (action.hoverIndex > action.dragIndex) {
        currentElem.order = action.hoverIndex;
        let currentId = currentElem.id;
        let arrayBefore = [
          ...currentPage['headers'],
          ...currentPage['images'],
          ...currentPage['paragraphs']
        ].filter(
          elem =>
            elem.order < action.hoverIndex && elem.order > action.dragIndex
        );
        let pair = [
          ...currentPage['headers'],
          ...currentPage['images'],
          ...currentPage['paragraphs']
        ].filter(elem => elem.order == currentElem.order);

        let moveToArrayBefore = pair.find(item => {
          return item.id != currentId;
        });

        if (!arrayBefore) return newState;
        arrayBefore.push(moveToArrayBefore);
        arrayBefore.map(elem => {
          if (elem) {
            let order = elem.order;
            elem.order = order - 1;
          }
        });
      } else {
        currentElem.order = action.hoverIndex;
        let currentId = currentElem.id;

        let arrayAfter = [
          ...currentPage['headers'],
          ...currentPage['images'],
          ...currentPage['paragraphs']
        ].filter(
          elem =>
            elem.order > action.hoverIndex && elem.order < action.dragIndex
        );

        let pair = [
          ...currentPage['headers'],
          ...currentPage['images'],
          ...currentPage['paragraphs']
        ].filter(elem => elem.order == currentElem.order);

        let moveToArrayAfter = pair.find(item => {
          return item.id != currentId;
        });

        if (!arrayAfter) return newState;
        arrayAfter.push(moveToArrayAfter);
        arrayAfter.map(elem => {
          if (elem) {
            let order = elem.order;
            elem.order = order + 1;
          }
        });
      }
      return newState;
    }
    case 'REMOVE_HEADER_MEDIA': {
      let newState = { ...state };
      newState.avatar = null;
      return newState;
    }
    case 'SELECT_HEADER_MEDIA': {
      let newState = { ...state };
      newState.avatar = action.media;
      return newState;
    }
    case 'CREATE_NEW_PAGE_ELEMENT': {
      let newState = { ...state };
      const randomInteger = (min, max) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
      };

      const currentPage = newState.pages.find(
        page => page.pageNumber == action.page
      );

      const currentPageElements = [
        ...currentPage['headers'],
        ...currentPage['images'],
        ...currentPage['paragraphs']
      ];
      console.log('currentPageElements', currentPageElements);
      console.log('currentPage', currentPage);

      if (!currentPage) return newState;

      if (!currentPageElements.length) {
        if (action.newElementType == 'new-header') {
          currentPage.headers.push({
            header: '',
            order: 0,
            id: randomInteger(10, 10000000)
          });
          return newState;
        }
        if (action.newElementType == 'new-media') {
          currentPage.images.push({
            image: null,
            order: 0,
            id: randomInteger(10, 10000000)
          });
          return newState;
        }
        if (action.newElementType == 'new-paragraph') {
          currentPage.paragraphs.push({
            paragraph: '',
            order: 0,
            id: randomInteger(10, 10000000)
          });
          return newState;
        }
      }
      const currentElem = [
        ...currentPage['headers'],
        ...currentPage['images'],
        ...currentPage['paragraphs']
      ].find(elem => elem.order == action.newElementOrder);

      if (!currentElem) return newState;
      let allPageElements = [
        ...currentPage['headers'],
        ...currentPage['images'],
        ...currentPage['paragraphs']
      ];
      if (action.newElementType == 'new-header') {
        currentPage.headers.push({
          header: '',
          order: action.newElementOrder,
          id: randomInteger(10, 10000000)
        });
        allPageElements.forEach(el => {
          if (el.order > action.newElementOrder) {
            el.order = el.order + 1;
          }
          if (el.id == currentElem.id) {
            el.order = el.order + 1;
          }
        });
        return newState;
      }
      if (action.newElementType == 'new-media') {
        currentPage.images.push({
          image: null,
          order: action.newElementOrder,
          id: randomInteger(10, 10000000)
        });
        allPageElements.forEach(el => {
          if (el.order > action.newElementOrder) {
            el.order = el.order + 1;
          }
          if (el.id == currentElem.id) {
            el.order = el.order + 1;
          }
        });
        return newState;
      }
      if (action.newElementType == 'new-paragraph') {
        currentPage.paragraphs.push({
          paragraph: '',
          order: action.newElementOrder,
          id: randomInteger(10, 10000000)
        });
        allPageElements.forEach(el => {
          if (el.order > action.newElementOrder) {
            el.order = el.order + 1;
          }
          if (el.id == currentElem.id) {
            el.order = el.order + 1;
          }
        });
        return newState;
      }
      if (action.newElementType == 'new-page') {
        let newPageElements = [
          ...currentPage['headers'],
          ...currentPage['images'],
          ...currentPage['paragraphs']
        ].filter(elem => elem.order >= action.newElementOrder);
        console.log('action.newElementOrder', action.newElementOrder);
        console.log('newPageElements', newPageElements);
        if (currentPage.paragraphs.length) {
          for (let i = currentPage.paragraphs.length - 1; i >= 0; i--) {
            if (currentPage.paragraphs[i].order >= action.newElementOrder) {
              currentPage.paragraphs.splice(i, 1);
            }
          }
        }
        if (currentPage.images.length) {
          for (let i = currentPage.images.length - 1; i >= 0; i--) {
            if (currentPage.images[i].order >= action.newElementOrder) {
              currentPage.images.splice(i, 1);
            }
          }
        }
        if (currentPage.headers.length) {
          for (let i = currentPage.headers.length - 1; i >= 0; i--) {
            if (currentPage.headers[i].order >= action.newElementOrder) {
              currentPage.headers.splice(i, 1);
            }
          }
        }

        let newPage = {
          pageNumber: action.page + 1,
          headers: [],
          paragraphs: [],
          images: [],
          info: [],
          inputExercises: []
        };
        newPageElements.map(el => {
          if (el.hasOwnProperty('header')) {
            newPage.headers.push(el);
          }
          if (el.hasOwnProperty('paragraph')) {
            newPage.paragraphs.push(el);
          }
          if (el.hasOwnProperty('image')) {
            newPage.images.push(el);
          }
        });

        console.log('newPageElements', newPageElements);
        console.log('newPage', newPage);

        newState.pages.map(el => {
          if (el.pageNumber > action.page) el.pageNumber = el.pageNumber + 1;
        });

        console.log('newState', newState);

        newState.pages.push(newPage);
        return newState;
      }
      return newState;
    }
    default:
      return state;
  }
};

export default bookReducer;
