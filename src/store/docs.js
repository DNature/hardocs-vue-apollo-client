// import Vuex from 'vuex'
import DocsServices from '@/services/index';

/**
 *  State should store all documents being created
 *     Create an id for each document
 *     Create  a page per document
 *
 */

export const state = {
  allDocs: [
    {
      id: 'dave',
      title: 'Here we go again',
      content: 'this is a content'
    },
    {
      id: 'jose',
      title: 'Voodoo child',
      content: 'this is a content with sorcery'
    },
    {
      id: 'friend',
      title: 'Jimmy child',
      content: 'Not also is a content with sorcery'
    }
  ],
  currentDoc: {
    id: 'dave',
    title: 'Here we go again',
    content: 'this is a content'
  }
};

export const mutations = {
  OPEN_PROJECT(state, allDocs) {
    state.allDocs = allDocs;
  },
  ADD_DOC(state, doc) {
    state.allDocs.push(doc);
  },

  REMOVE_DOC(state, docId) {
    // check if docId is correct, etc...
    let index = state.allDocs.findIndex((el) => el.id === docId);
    // Need to get the doc and the position
    state.allDocs.splice(index, 1);
  },
  SET_CURRENT_DOC(state, doc) {
    state.currentDoc = doc;
  },

  // This is to update the content from the Doc component
  SET_CONTENT(state, editedDoc) {
    // We have to identify the doc to be updated
    // Then replace the content
    let newDoc = state.allDocs.find((doc) => doc.id == editedDoc.id);
    newDoc.content = editedDoc.content;
    newDoc.title = editedDoc.title;
  }
};

export const actions = {
  async fetchDocs({ commit }, path) {
    // make ajax call to graphQL server to get the documents
    const result = await DocsServices.getProject(path);
    result.data.openProject.allDocsData.filter((element) => {
      // create id
      element.id = Math.floor(Math.random() * 1000000);

      // Create title
      // Step 1: extract h1 only
      let regex = /<h1 [^>]+>(.*?)<\/h1>/;
      element.title = element.content.match(regex)[0];

      // Step 2: get only text inside h1 tags
      regex = /(<([^>]+)>)/gi;
      element.title = element.title.replace(regex, '').trim();
    });

    commit('OPEN_PROJECT', result.data.openProject.allDocsData);
  },

  setDoc({ commit }, docId) {
    const doc = this.state.docs.allDocs.find((doc) => doc.id == docId);
    commit('SET_CURRENT_DOC', doc);
  }
};
