/**
 * Created by nebel on 13.05.2016.
 */

export function init(state, data) {
    return {
        categories: data.categories,
        currentCategory: '',
        currentCategoryIndexes: [],
        history: [data.book],
        currentBookHistoryIndex: 0
    }
}

export function next(state, book) {
    if (state.currentCategoryIndexes.length) {
        return nextInCategory(state, book);
    } else {
        return nextAll(state, book);
    }
}

export function prev(state) {
    let historyIndex = state.currentBookHistoryIndex;
    const currentCategoryIndexes = state.currentCategoryIndexes;

    if (currentCategoryIndexes.length) {
        const posInArray = currentCategoryIndexes.indexOf(historyIndex);
        if ( posInArray > 0)
            historyIndex = currentCategoryIndexes[posInArray-1];
    } else if (historyIndex > 0){
        historyIndex -= 1;
    }

    return Object.assign({}, state, {
        currentBookHistoryIndex: historyIndex});
}

export function changeCategory(state, category) {
    if (category === '') {
        
        return Object.assign({}, state, {
            currentCategory: '',
            currentCategoryIndexes: [],
            currentBookHistoryIndex: state.history.length-1});
        
    } else {
        
        const indexes = getCategoryIndexes(state, category);
        return Object.assign({}, state, {
            currentCategory: category,
            currentCategoryIndexes: indexes,
            currentBookHistoryIndex: indexes.length ? 
                                     indexes[indexes.length-1] :
                                     state.currentBookHistoryIndex});   
    }
}

function getCategoryIndexes(state, category) {
    const history = state.history;
    const historyPerCategory = history.filter((item) => {
        return item.category === category;
    });
    return historyPerCategory.map((item) => {
        return history.indexOf(item);
    });
}

function nextInCategory(state, book) {
    const historyIndex = state.currentBookHistoryIndex;
    const categoryIndexes = state. currentCategoryIndexes;
    const categoryIndexesLength = categoryIndexes.length;
    const posInArray = categoryIndexes.indexOf(historyIndex);

    if (posInArray < categoryIndexesLength - 1) {

        return Object.assign({}, state, {currentBookHistoryIndex: categoryIndexes[posInArray + 1]});

    } else if (categoryIndexesLength >= HISTORY_MAX) {

        return {
            categories: state.categories,
            currentCategory: state.currentCategory,
            currentCategoryIndexes: [0],
            history: [book],
            currentBookHistoryIndex: 0
        }

    } else {

        return {
            categories: state.categories,
            currentCategory: state.currentCategory,
            currentCategoryIndexes: [...state.currentCategoryIndexes, historyIndex + 1],
            history: [...state.history, book],
            currentBookHistoryIndex: historyIndex + 1
        }

    }
}

function nextAll(state, book) {
    const history = state.history;
    const historyLength = history.length;
    const currentBookHistoryIndex = state.currentBookHistoryIndex;

    if (currentBookHistoryIndex < historyLength - 1) {

        return Object.assign({}, state, {currentBookHistoryIndex: currentBookHistoryIndex + 1});

    } else if (historyLength >= HISTORY_MAX) {

        return {
            categories: state.categories,
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [book],
            currentBookHistoryIndex: 0
        }

    } else {

        return {
            categories: state.categories,
            currentCategory: state.currentCategory,
            currentCategoryIndexes: [],
            history: [...history, book],
            currentBookHistoryIndex: currentBookHistoryIndex + 1
        }

    }
}

export const HISTORY_MAX = 10;
